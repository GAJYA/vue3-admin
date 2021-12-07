import axios, { AxiosRequestConfig } from 'axios'

const request = axios.create({
  baseURL: 'https://shop.fed.lagou.com/api/admin/' // 基本路径
})
// request不支持泛型
// request.get、post等方法支持响应数据泛型
// 由于后端包装了一层数据data，导致我们访问数据比较麻烦，所以自己封装一个request
// 请求拦截器
request.interceptors.request.use(
  config => {
    // 统一设置用户身份 Token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 统一处理响应错误，例如 token 无效、服务端异常等
    return response
  },
  err => {
    return Promise.reject(err)
  }
)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return res.data.data as T
  })
}
