
/**
 * 步骤：
    1. 在 utils/request.js 配置 axios 请求基地址
        作用：提取公共前缀地址，配置后 axios 请求时都会 baseURL + url
    2. 收集手机号和验证码数据
    3. 基于 axios 调用验证码登录接口
    4. 使用 Bootstrap 的 Alert 警告框反馈结果给用户
 */

// axios 公共配置
// 基地址
axios.defaults.baseURL = 'http://geek.itheima.net'


/*
    什么是axios请求拦截器？
        发起请求之前，调用的一个函数，对请求参数进行设置
    axios请求拦截器，什么时候使用？
        在有公共配置和设置时，统一设置在请求拦截器中
*/
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 统一携带 token 令牌字符串在请求头上
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = `Bearer ${token}`)
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});