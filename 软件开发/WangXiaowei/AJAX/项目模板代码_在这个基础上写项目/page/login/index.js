/**
 * 目标1：验证码登录
 * 1.1 在 utils/request.js 配置 axios 请求基地址
 * 1.2 收集手机号和验证码数据
 * 1.3 基于 axios 调用验证码登录接口
 * 1.4 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */

//  1.2 收集手机号和验证码数据
// document.querySelector('.btn').addEventListener('click', () => {
//     //先要获取到搜集那个表单标签对象，要求每一个表单元素(要求得有name属性)
//     const form = document.querySelector('.login-form')
//     const data = serialize(form, { hash: true, empty: true })
//     console.log(data)
//     // 1.3 基于 axios 调用验证码登录接口
//     axios({
//         url: '/v1_0/authorizations',
//         method: 'POST',
//         data,
//     }).then(result => {
//         myAlert(true, '登陆成功')
//         console.log(result)

//         // 1.2 登录成功后，保存 token 令牌字符串到本地，并跳转到内容列表页面
//         localStorage.setItem('token', result.data.data.token)
//         setInterval(() => {
//             // 延迟跳转，让alert警告框停留一会
//             location.href = '../content/index.html'
//         }, 1500)

//     }).catch(error => {
//         myAlert(false, error.response.data.message)
//         console.dir(error.response.data.message)
//     })
// })

//  1.2 收集手机号和验证码数据
// document.querySelector('.btn').addEventListener('click', () => {
//     //先要获取到搜集那个表单标签对象，要求每一个表单元素(要求得有name属性)
//     const form = document.querySelector('.login-form')
//     const data = serialize(form, { hash: true, empty: true })
//     console.log(data)
//     //  // 1.3 基于 axios 调用验证码登录接口
//     axios({
//         url: '/v1_0/authorizations',
//         method: 'POST',
//         data,
//     }).then(result => {
//         myAlert(true, '登陆成功')
//         console.log(result)

//         // 1.2 登录成功后，保存 token 令牌字符串到本地，并跳转到内容列表页面
//         localStorage.setItem('token', result.data.data.token)
//         setInterval(() => {
//             // 延迟跳转，让alert警告框停留一会
//             location.href = '../content/index.html'
//         }, 1500)

//     }).catch(error => {
//         myAlert(false, error.response.data.message)
//         console.dir(error.response.data.message)
//     })
// })

// 目标：只有登录状态，才可以访问内容页面
// 步骤：
// 概念：访问权限的令牌，本质上是一串字符串
// 创建：正确登录后，由后端签发并返回

// 1. 在 utils/auth.js 中判断无 token 令牌字符串，则强制跳转到登录页（手动修改地址栏测试）
// 2. 在登录成功后，保存 token 令牌字符串到本地，再跳转到首页（手动修改地址栏测试）

// token的作用是  判断用户是否登录状态

/*
    token的注意：
        前端只能判断token的有无
        后端通过解密可以提取token字符串的原始信息，判断有效性
*/ 

// 1.2 收集手机号和验证码数据
document.querySelector('.btn').addEventListener('click', () => {
    //  //先要获取到搜集那个表单标签对象，要求每一个表单元素(要求得有name属性)
    const form = document.querySelector('.login-form')
    const data = serialize(form, { hash: true, empty: true })
    console.log(data)
    // 1.3 基于 axios 调用验证码登录接口
    axios({
        url: '/v1_0/authorizations',
        method: 'POST',
        data,
    }).then(result => {
        myAlert(true, '登陆成功')
        console.log(result)
        // 1.2 登录成功后，保存 token 令牌字符串到本地，并跳转到内容列表页面
        localStorage.setItem('token', result.data.data.token)
        setInterval(() => {
            //延迟跳转，让alert警告框停止一会儿
            location.href = '../content/index.html'
        }, 1500)
    }).catch(error => {
        myAlert(false, error.response.data.message)
        console.dir(error)
        console.dir(error.response.data.message)
    })
})