/**
 * 目标1：设置频道下拉菜单
 *  1.1 获取频道列表数据
 *  1.2 展示到下拉菜单中
 */

// 1.1 获取频道列表数据
async function setChannleList() {
    const res = await axios({
        url: '/v1_0/channels'
    })
    // console.log(res)
    const htmlStr = `<option value="" selected="">请选择文章频道</option>` + res.data.channels.map(item => `<option value="${item.id}">${item.name}</option>`).join('')
    // console.log(htmlStr)
    document.querySelector('.form-select').innerHTML = htmlStr
}
//网站运行后，默认调用一次
setChannleList()


/**
 * 目标2：文章封面设置
 *  2.1 准备标签结构和样式
 *  2.2 选择文件并保存在 FormData
 *  2.3 单独上传图片并得到图片 URL 网址
 *  2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
 */
document.querySelector('.img-file').addEventListener('change', async e => {
    const file = e.target.files[0]
    // console.log(file)
    const fd = new FormData()
    fd.append('image', file)
    // 2.3 单独上传图片并得到图片 URL 网址
    const res = await axios({
        url: '/v1_0/upload',
        method: 'POST',
        data: fd
    })
    // console.log(res)
    // 2.4 回显并切换 img 标签展示（隐藏 + 号上传标签）
    const imgUrl = res.data.url
    document.querySelector('.rounded').src = imgUrl
    document.querySelector('.rounded').classList.add('show')
    document.querySelector('.place').classList.add('hide')
})

//优化：点击img可以重新切换封面
//思路： img点击 =》 使用js方式触发文件选择元素click事件方法
document.querySelector('.rounded').addEventListener('click', () => {
    document.querySelector('.img-file').click()
})

/**
 * 目标3：发布文章保存
 *  3.1 基于 form-serialize 插件收集表单数据对象
 *  3.2 基于 axios 提交到服务器保存
 *  3.3 调用 Alert 警告框反馈结果给用户
 *  3.4 重置表单并跳转到列表页
 */

// 3.1 基于 form-serialize 插件收集表单数据对象
document.querySelector('.send').addEventListener('click', async e => {
    if (e.target.innerHTML !== '发布') return
    const form = document.querySelector('.art-form')
    const data = serialize(form, { hash: true, empty: true })
    // 发布文章的时候，不需要id属性，所以可以删除掉(id为了后续做编辑使用)
    delete data.id
    // console.log(data)
    //自己收集封面图片地址并保存到data对象中
    data.cover = {
        type: 1, // 封面类型
        image: [document.querySelector('.rounded ').src] //封面图片，URL 网址
    }
    // 3.2 基于 axios 提交到服务器保存
    try {
        const res = await axios({
            url: '/v1_0/mp/articles',
            method: 'POST',
            data: data
        })
        // 3.3 调用 Alert 警告框反馈结果给用户
        myAlert(true, '发布成功')
        // 3.4 重置表单并跳转到列表页
        form.reset()

        //封面需要手动重置
        document.querySelector('.rounded').src = ''
        document.querySelector('.rounded').classList.remove('show')
        document.querySelector('.place').classList.remove('hide')
        //富文本编辑器重置
        editor.setHtml('')

        setTimeout(() => {
            location.href = '../content/index.html'
        }, 1500)

    } catch (error) {
        myAlert(false, error.response.data.message)
        // console.dir(error)
    }
    // console.log(res)
})


    /**
     * 目标4：编辑-回显文章
     *  4.1 页面跳转传参（URL 查询参数方式）
     *  4.2 发布文章页面接收参数判断（共用同一套表单）
     *  4.3 修改标题和按钮文字
     *  4.4 获取文章详情数据并回显表单
     */
    // 立即执行函数(防御函数)
    ; (function () {
        // 4.2 发布文章页面接收参数判断（共用同一套表单）
        // console.log(location.search)
        const paramsStr = location.search
        const params = new URLSearchParams(paramsStr)
        params.forEach(async (value, key) => {
            console.log(value, key)
            //当前又要编辑的文章id被传入过来
            if (key === 'id') {
                // 4.3 修改标题和按钮文字
                document.querySelector('.title span').innerHTML = '修改文章'
                document.querySelector('.send').innerHTML = '修改'
                // 4.4 获取文章详情数据并回显表单
                const res = await axios({
                    url: `/v1_0/mp/articles/${value}`
                })
                console.log(res)
                // 组织我需要的数据对象。为后续遍历会先到页面上做铺垫
                const dataObj = {
                    channel_id: res.data.channel_id,
                    title: res.data.title,
                    rounded: res.data.cover.images[0], //封面图片的地址
                    content: res.data.content,
                    id: res.data.id
                }
                //遍历数据对象的属性，映射到页面元素上，快速赋值
                Object.keys(dataObj).forEach(key => {
                    if (key === 'rounded') {
                        //封面的设置
                        if (dataObj[key]) {
                            //有封面
                            document.querySelector('.rounded').src = dataObj[key]
                            document.querySelector('.rounded').classList.add('show')
                            document.querySelector('.place').classList.add('hide')
                        }
                    } else if (key === 'content') {
                        //富文本编辑器
                        editor.setHtml(dataObj[key])
                    } else {
                        //用数据对象属性名，作为标签name属性选择器来找到匹配的标签
                        document.querySelector(`[name=${key}]`).value = dataObj[key]
                    }
                })
            }
        })
    })();

/**
 * 目标5：编辑-保存文章
 *  5.1 判断按钮文字，区分业务（因为共用一套表单）
 *  5.2 调用编辑文章接口，保存信息到服务器
 *  5.3 基于 Alert 反馈结果消息给用户
 */

document.querySelector('.send').addEventListener('click', async e => {
    // 5.1 判断按钮文字，区分业务（因为共用一套表单）
    if (e.target.innerHTML !== '修改') return
    //修改文章逻辑
    const form = document.querySelector('.art-form')
    const data = serialize(form, { hash: true, empty: true })
    console.log(data)
    //5.2 调用编辑文章接口，保存信息到服务器
    try {
        const res = await axios({
            url: `/v1_0/mp/articles/${data.id}`,
            method: 'PUT',
            data: {
                ...data,
                cover: {
                    type: document.querySelector('.rounded').src ? 1 : 0,
                    img: [document.querySelector('.rounded').src]
                }
            }
        })
        console.log(res)
        myAlert(true,'修改文章成功')
    } catch (error) {
        myAlert(false, error.response.data.message)
    }

})
