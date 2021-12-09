/**
 * 公共基础接口封装
 */
import request from '@/utils/request'
import { LoginInfo } from './types/common'

// interface ResponseData<T = any> {
//     status: number
//     msg: string
//     data: T
// }

export const getLogInfo = () => {
  return request<LoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
//   return request.get<ResponseData<{
//     logo_square: string
//     logo_rectangle: string
//     login_logo: string
//     slide: string[]
// }>>('/login/info').then(res => {
//   return res.data.data
// })
}

export const getCaptcha = () => {
  return request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    params: {
      stamp: Date.now() // 保证每次请求的接口地址都是不一样的，避免缓存问题，因为每次调用的都是同一个接口地址，可能会遇到缓存的问题
    },
    responseType: 'blob' // 请求获取图片数据
  })
}
