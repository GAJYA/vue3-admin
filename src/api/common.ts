/**
 * 公共基础接口封装
 */
import request from '@/utils/request'

export const getLogInfo = () => {
  return request({
    method: 'GET',
    url: '/login/info'
  })
}
