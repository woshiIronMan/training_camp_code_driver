// /**
//  * 目标1：渲染图书列表
//  *  1.1 获取数据
//  *  1.2 渲染数据
//  */
// const creator = '老张'
// // 封装-获取并渲染图书列表函数
// function getBooksList() {
//   // 1.1 获取数据
//   axios({
//     url: 'http://hmajax.itheima.net/api/books',
//     params: {
//       // 外号：获取对应数据
//       creator
//     }
//   }).then(result => {
//     // console.log(result)
//     const bookList = result.data.data
//     // console.log(bookList)
//     // 1.2 渲染数据
//     const htmlStr = bookList.map((item, index) => {
//       return `<tr>
//       <td>${index + 1}</td>
//       <td>${item.bookname}</td>
//       <td>${item.author}</td>
//       <td>${item.publisher}</td>
//       <td data-id=${item.id}>
//         <span class="del">删除</span>
//         <span class="edit">编辑</span>
//       </td>
//     </tr>`
//     }).join('')
//     // console.log(htmlStr)
//     document.querySelector('.list').innerHTML = htmlStr
//   })
// }
// // 网页加载运行，获取并渲染列表一次
// getBooksList()

// // 2.1 创建弹框对象
// const addModalDom = document.querySelector('.add-modal')
// const addModal = new bootstrap.Modal(addModalDom)
// // 保存按钮->点击->隐藏弹框
// document.querySelector('.add-btn').addEventListener('click', () => {
//   // 2.2 收集表单数据，并提交到服务器保存
//   const addForm = document.querySelector('.add-form')
//   const bookObj = serialize(addForm, { hash: true, empty: true })
//   // console.log(bookObj)
//   // 提交到服务器
//   axios({
//     url: 'http://hmajax.itheima.net/api/books',
//     method: 'POST',
//     data: {
//       ...bookObj,
//       creator
//     }
//   }).then(result => {
//     // console.log(result)
//     // 2.3 添加成功后，重新请求并渲染图书列表
//     getBooksList()
//     // 重置表单
//     addForm.reset()
//     // 隐藏弹框
//     addModal.hide()
//   })
// })

// /**
//  * 目标3：删除图书
//  *  3.1 删除元素绑定点击事件->获取图书id
//  *  3.2 调用删除接口
//  *  3.3 刷新图书列表
//  */
// // 3.1 删除元素->点击（事件委托）
// document.querySelector('.list').addEventListener('click', e => {
//   // 获取触发事件目标元素
//   // console.log(e.target)
//   // 判断点击的是删除元素
//   if (e.target.classList.contains('del')) {
//     // console.log('点击删除元素')
//     // 获取图书id（自定义属性id）
//     const theId = e.target.parentNode.dataset.id
//     // console.log(theId)
//     // 3.2 调用删除接口
//     axios({
//       url: `http://hmajax.itheima.net/api/books/${theId}`,
//       method: 'DELETE'
//     }).then(() => {
//       // 3.3 刷新图书列表
//       getBooksList()
//     })
//   }
// })

// /**
//  * 目标4：编辑图书
//  *  4.1 编辑弹框->显示和隐藏
//  *  4.2 获取当前编辑图书数据->回显到编辑表单中
//  *  4.3 提交保存修改，并刷新列表
//  */
// // 4.1 编辑弹框->显示和隐藏
// const editDom = document.querySelector('.edit-modal')
// const editModal = new bootstrap.Modal(editDom)
// // 编辑元素->点击->弹框显示
// document.querySelector('.list').addEventListener('click', e => {
//   // 判断点击的是否为编辑元素
//   if (e.target.classList.contains('edit')) {
//     // 4.2 获取当前编辑图书数据->回显到编辑表单中
//     const theId = e.target.parentNode.dataset.id
//     axios({
//       url: `http://hmajax.itheima.net/api/books/${theId}`
//     }).then(result => {
//       const bookObj = result.data.data
//       // document.querySelector('.edit-form .bookname').value = bookObj.bookname
//       // document.querySelector('.edit-form .author').value = bookObj.author
//       // 数据对象“属性”和标签“类名”一致
//       // 遍历数据对象，使用属性去获取对应的标签，快速赋值
//       const keys = Object.keys(bookObj) // ['id', 'bookname', 'author', 'publisher']
//       keys.forEach(key => {
//         document.querySelector(`.edit-form .${key}`).value = bookObj[key]
//       })
//     })
//     editModal.show()
//   }
// })
// // 修改按钮->点击->隐藏弹框
// document.querySelector('.edit-btn').addEventListener('click', () => {
//   // 4.3 提交保存修改，并刷新列表
//   const editForm = document.querySelector('.edit-form')
//   const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true})
//   // 保存正在编辑的图书id，隐藏起来：无需让用户修改
//   // <input type="hidden" class="id" name="id" value="84783">
//   axios({
//     url: `http://hmajax.itheima.net/api/books/${id}`,
//     method: 'PUT',
//     data: {
//       bookname,
//       author,
//       publisher,
//       creator
//     }
//   }).then(() => {
//     // 修改成功以后，重新获取并刷新列表
//     getBooksList()

//     // 隐藏弹框
//     editModal.hide()
//   })
// })

//定义一个全局常量
const creator = '你好'
//获取并渲染图书列表
function getBooksList() {
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      creator
    }
  }).then(result => {
    // console.log(result);
    const bookList = result.data.data
    // console.log(bookList);
    //1.2渲染数据
    const htmlStr = bookList.map((items, index) => {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${items.bookname}</td>
          <td>${items.author}</td>
          <td>${items.publisher}</td>
          <td data-id=${items.id}>
            <span class="del">删除</span>
            <span class="edit">编辑</span>
          </td>
        </tr>
      `
    }).join('')
    // console.log(htmlStr);
    document.querySelector('.list').innerHTML = htmlStr
  })
}
//网页加载运行后，获取并渲染列表一次
getBooksList()

//2.1 先创建一个弹框对象
const addModalDom = document.querySelector('.add-modal')
//将addModalDom传入这个创造的addModal的新对象里面
const addModal = new bootstrap.Modal(addModalDom)
//设置点击事件
document.querySelector('.add-btn').addEventListener('click', () => {
  //2.2搜集表单数据，并提交到服务器保存
  const addForm = document.querySelector('.add-form')
  const bookObj = serialize(addForm, { hash: true, empty: true })
  console.log(bookObj);
  //提交到服务器
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'POST',
    data: {
      //展开语法
      ...bookObj,
      creator
    }
  }).then(result => {
    console.log(result)
    //2.3添加成功后，重新请求斌渲染图书列表
    getBooksList()
    //2.4重置表单
    addForm.reset()
    //2.5隐藏表单
    addModal.hide()
  })

})

//3.1 删除元素-》点击(事件委托)
//删除元素是动态创建的，所以我们使用动态委托
document.querySelector('.list').addEventListener('click', e => {
  if (e.target.classList.contains('del')) {
    // console.log('点击删除元素')
    //获取图书id(自定义属性id)
    const timeId = e.target.parentNode.dataset.id
    // console.log(timeId)
    //3.2 调用删除接口
    axios({
      url: `http://hmajax.itheima.net/api/books/${timeId}`,
      method: 'delete',
    }).then(result => {
      //重新调用刷新函数
      getBooksList()
    })
  }
})

//编辑元素
//4.1 编辑弹框->显示隐藏
const editDOm = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDOm)
document.querySelector('.list').addEventListener('click', e => {
  if (e.target.classList.contains('edit')) {
    // console.log('编辑')
    //4.2 获取当前编辑图书数据->回显到编辑表单中
    const theId = e.target.parentNode.dataset.id
    // console.log(theId)
    axios({
      url: `https://hmajax.itheima.net/api/books/${theId}`,

    }).then(result => {
      // console.log(result)
      const bookObj = result.data.data
      //数据对象的属性和标签类名一致
      //遍历数据对象，使用属性去获取对应的标签，快速赋值
      const keys = Object.keys(bookObj)
      console.log(keys) // ['id', 'bookname', 'author', 'publisher']
      keys.forEach(keys => {
        document.querySelector(`.edit-modal .${keys}`).value = bookObj[keys]
      })

    })
    editModal.show()
  }
})
//修改按钮 -> 点击 -> 隐藏弹框
document.querySelector('.edit-btn').addEventListener('click', () => {
  //4.3 提交保存修改 并刷新列表
  const editForm = document.querySelector('.edit-form')
  const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
  // console.log(bookObj)
  //隐藏的表单域保存正在编辑的图书的id  隐藏起来  无需让用户修改
  // <input type="hidden" class="id" name="id" value="654927">
  axios({
    url: `https://hmajax.itheima.net/api/books/${id}`,
    method:'PUT',
    data:{
      bookname,
      author,
      publisher,
      creator
    }
  }).then(() => {
    getBooksList()

    //隐藏弹框
     editModal.hide()
  })
 
})