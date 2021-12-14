/**
 * 商品相关接口
 */
import request from '@/utils/request'
import type { IProductParams, IProductQuery, IProductData } from './types/product'
// import type { IFormData } from './types/form'

// 1分钟保存一次数据
export const saveProductCache = () => {
  return request({
    method: 'POST',
    url: '/product/cache'
  })
}

// 删除商品草稿
export const deleteProductCache = (id: number) => {
  return request({
    method: 'DELETE',
    url: '/product/cache'
  })
}

// 保存新建或编辑 id值为0时候为新建角色
export const saveProduct = (id: number, data: IProductParams) => {
  return request({
    method: 'POST',
    url: `/product/product/${id}`,
    data
  })
}

// 商品上下架操作 /product/product/set_show/:id/:is_show
export const updateProductStatus = (id: number, is_show: 1 | 0) => {
  return request({
    method: 'PUT',
    url: `/product/product/set_show/${id}/${is_show}`
  })
}
// 商品列表
export const getProductList = (params: IProductQuery) => {
  return request<{
       list: IProductData[]
       count: number
     }>({
       method: 'GET',
       url: '/product/product',
       params
     })
}

// 商品加入/移除回收站
export const deleteProduct = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/product/product/${id}`
  })
}

// 商品导出 /export/storeProduct
export const exportProduct = (params: IProductQuery) => {
  return request({
    method: 'GET',
    url: '/export/storeProduct',
    params
  })
}

// 商品属性详情
export const getProductAttr = (id: number) => {
  return request({
    method: 'GET',
    url: `/product/attr/${id}`
  })
}

// 商品快速编辑
export const quickEditProduct = (id: number, data: {
    field: string
    value: string
}) => {
  return request({
    method: 'PUT',
    url: `/product/product/set_product/${id}`,
    data
  })
}
// 商品详情
export const getProductInfo = (id: number) => {
  return request({
    method: 'GET',
    url: `/product/product/${id}`
  })
}
