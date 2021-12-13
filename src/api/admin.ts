/**
 * 管理员相关接口
 */
import request from '@/utils/request'
import type { IListParams, IListData, ICreateAdmin } from './types/admin'
import type { IFormData } from './types/form'

export const getAdminList = (params: IListParams) => {
  return request<{
      list: IListData[]
      count: number
  }>({
    method: 'GET',
    url: '/setting/admin',
    params
  })
}

// 新增管理员
export const createAdmin = (data: ICreateAdmin) => {
  return request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

// 更新管理员信息
export const updateAdmin = (id: number, data: ICreateAdmin) => {
  return request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

// 删除管理员
export const deleteAdmin = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

// 修改当前管理员信息 /setting/update_admin
export const updateCurrentAdmin = (data: {
    real_name: string
    head_pic: string
    pwd: string
    new_pwd: string
    conf_pwd: string
}) => {
  return request({
    method: 'PUT',
    url: '/setting/update_admin',
    data
  })
}

// 修改状态 /setting/set_status/:id/:status
export const updateAdminStatus = (id: number, status: 1 | 0) => {
  return request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}

// 获取当前管理员信息
export const getAdminInfo = () => {
  return request<IListData>({
    method: 'GET',
    url: '/setting/info'
  })
}

// 管理员添加表单
export const getRoles = () => {
  return request<IFormData>({
    method: 'GET',
    url: 'setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')
    if (roles && roles.options) {
      return roles.options
    } else {
      return []
    }
  })
}

export const getAdmin = (id: number) => {
  return request<IFormData>({
    method: 'GET',
    url: `setting/admin/${id}/edit`
  }).then(data => {
    const obj: Record<string, any> = {}
    data.rules.forEach(item => {
      obj[item.field] = item.value
    })
    return obj as ICreateAdmin
  })
}
