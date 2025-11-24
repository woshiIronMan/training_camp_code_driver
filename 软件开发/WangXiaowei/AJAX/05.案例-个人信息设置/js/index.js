/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = '小猫子'
//1.1、获取用户的数据
axios({
    url: 'https://hmajax.itheima.net/api/settings',
    params: {
        creator
    }
}).then(result => {
    // console.log(result.data.data)
    const userObj = result.data.data
    console.log(userObj)
    //回显数据到标签        
    Object.keys(userObj).forEach(key => {
        if (key === 'avatar') {
            //赋予头像
            document.querySelector('.prew').src = userObj[key]
        } else if (key === 'gender') {
            //赋予默认性别
            //获取性别单选框 [男radio元素]
            const gRadioList = document.querySelectorAll('.gender')
            // console.log(gRadioList);
            //获取性别数字：0男1女
            const gNum = userObj[key]
            // console.log(gNum)
            //规律：可以通过性别数字，作为下标，找到对应性别单选框，设置选中状态
            // console.log(gRadioList[gNum])
            gRadioList[gNum].checked = true
        } else {
            //赋予默认内容
            document.querySelector(`.${key}`).value = userObj[key]
        }
    })
})

//文件选择元素 =》 change事件
document.querySelector('.upload').addEventListener('change', e => {
    //获取头像文件
    console.log(e.target.files[0]);
    const fd = new FormData()
    fd.append('avatar', e.target.files[0])
    fd.append('creator', '小猫子')
    axios({
        url: 'https://hmajax.itheima.net/api/avatar',
        method: 'put',
        data: fd
    }).then(result => {
        // console.log(result.data.data.avatar)
        const imgUrl = result.data.data.avatar
        //把新的头像回显到img
        document.querySelector('prev').src = imgUrl

    })
})

//保存修改 -》点击
document.querySelector('.submit').addEventListener('click', () => {
    //3.1 收集表单数据
    const userForm = document.querySelector('.user-form')
    const userObj = serialize(userForm, { hash: true, empty: true })
    console.log(userObj);
    userObj.creator = creator
    //性别数字字符串，转换为数字类型
    userObj.gender = +userObj.gender
    console.log(userObj)
    
    //3.2 提交到服务器保存
    axios({
        url:'https://hmajax.itheima.net/api/settings',
        method:'put',
        //自动转换JOSN字符串
        data:userObj    // 将 userObj 作为请求体发送
    }).then(result =>{
        const toastDom = document.querySelector('.my-toast')
        const toast = new bootstrap.Toast(toastDom)

        //4.2 调用show方法 =》 显示提示框
        toast.show()
    })
})

