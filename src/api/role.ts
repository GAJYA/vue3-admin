/**
 * 角色相关接口
 */
import request from '@/utils/request'
import type { IRoleParams, IRoleData, IRoleMenu } from './types/role'
// import type { IFormData } from './types/form'

// 获取角色列表
export const getRoleList = (params: IRoleParams) => {
  return request<{
       list: IRoleData[]
       count: number
   }>({
     method: 'GET',
     url: '/setting/role',
     params
   })
}

// 保存新建角色或编辑角色
export const saveRole = (id: number, data: {
    role_name: string
    status: 0 | 1
    checked_menus: number[]
}) => {
  return request({
    method: 'POST',
    url: `/setting/role/${id}`,
    data
  })
}

// 删除管理员
export const deleteRole = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/setting/role/${id}`
  })
}

// 修改状态 /setting/set_status/:id/:status
export const updateRoleStatus = (id: number, status: 1 | 0) => {
  return request({
    method: 'PUT',
    url: `/setting/role/set_status/${id}/${status}`
  })
}

// 获取表单里的权限列表
export const getRolePermission = () => {
  return request<{
    menus: IRoleMenu[]
  }>({
    method: 'GET',
    url: '/setting/role/create'
  })
}

// 编辑详情
export const getRoleInfo = (id: number) => {
  return request<{
    menus: IRoleMenu[]
    role: IRoleData
  }>({
    method: 'GET',
    url: `/setting/role/${id}/edit`
  })
}
