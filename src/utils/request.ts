import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '@/store/index'
import { useRouter } from 'vue-router'
console.log(import.meta.env)

// const store = useStore()
const router = useRouter()
const request = axios.create({
  // 不同环境可能有不同地址
  baseURL: import.meta.env.VITE_API_BASEURL // 基本路径
})
// request不支持泛型
// request.get、post等方法支持响应数据泛型
// 由于后端包装了一层数据data，导致我们访问数据比较麻烦，所以自己封装一个request
// 请求拦截器
request.interceptors.request.use(
  config => {
    // 统一设置用户身份 Token
    console.log(store)
    const user = store.state.userInfo
    if (user && user.token && config.headers) {
      config.headers.Authorization = 'Bearer ' + user.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 控制登录过期的锁，比如当前页面多个请求都需要权限，可能会出现连续弹出框的情况
let isRefresh = false
// 响应拦截器
request.interceptors.response.use(
  response => {
    const status = response.data.status
    // 正确的情况
    if (!status || status === 200) {
      return response
    }
    // 统一处理响应错误，例如 token 无效、服务端异常等
    if (status === 410000) {
      if (isRefresh) return
      isRefresh = true
      ElMessageBox.confirm('您的登录已过期，请确认重新登录，或取消停留在当前页面', '登录过期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        // 本地清除过期的登录状态
        store.commit('setUser', null)
        // 跳转到登录页面
        router.push({
          name: 'login',
          query: { redirect: router.currentRoute.value.fullPath }
        })
      // 抛出异常
      }).finally(() => {
        // 确保本次完了以后，后续可以正常处理
        isRefresh = false
      })
      return Promise.reject(response.data)
    }
    // 服务使用的自定义状态码的情况，接口返回的失败的状态码
    ElMessage.error(response.data.msg || '请求失败，请稍后重试')
    // 手动返回一个Promise异常
    return Promise.reject(response.data)
  },
  err => {
    return Promise.reject(err)
  }
)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    return (res.data.data || res.data)as T // 返回的数据是json的情况下，可以这样写，如果是返回的图片等则不可以
  })
}
