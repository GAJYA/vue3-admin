/**
 * 商品相关接口
 */
import request from '@/utils/request'
import type {
  IProductParams,
  IProductQuery,
  IHeader,
  ICategoryTree,
  IProductData, IProductClassify, IGenerateAttr, IRuleClass, IAttrList, IRuleDetail
} from './types/product'
// import type { IFormData } from './types/form'

/**
 * -----------------------商品列表----------------------
*/

// 1分钟保存一次数据
export const saveProductCache = () => {
  return request({
    method: 'POST',
    url: '/product/cache'
  })
}

// 删除商品草稿
export const deleteProductCache = () => {
  return request({
    method: 'DELETE',
    url: '/product/cache'
  })
}
// 获取退出是未保存数据
export const getProductCache = () => {
  return request({
    method: 'GET',
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

// 检测活动存在
export const checkActivity = (id: number) => {
  return request({
    method: 'GET',
    url: `/product/product/check_activity/${id}`
  })
}

// 生成属性
export const generateAttr = (id: number, type: 0 | 1, data: {
  attrs: string
}) => {
  return request<IGenerateAttr[]>({
    method: 'POST',
    url: `/product/generate_attr/${id}/${type}`,
    data
  })
}

// 获取上传密钥
export const getTempKeys = () => {
  return request({
    method: 'GET',
    url: '/product/product/get_temp_keys'
  })
}

// 获取商品分类列表
export const getProductClassify = (type: number) => {
  return request<IProductClassify[]>({
    method: 'GET',
    url: `/product/category/cascader_list/${type}`
  })
}

// 获取商品表单头
export const getTypeHeader = () => {
  return request<{
    list: IHeader[]
    count: number
  }>({
    method: 'GET',
    url: '/product/product/type_header'
  })
}

// 获取商品详情描述
export const getGoodsField = (id: number) => {
  return request({
    method: 'GET',
    url: `/goods/get_goods_field/${id}`
  })
}

// 获取规则属性模板
export const getRule = () => {
  return request<IRuleClass[]>({
    method: 'GET',
    url: '/product/product/get_rule'
  })
}

// 获取运费模板
export const getRateTemplate = () => {
  return request<{
    id: number
    name: string
  }[]>({
    method: 'GET',
    url: '/product/product/get_template'
  })
}

// 设置产品批量上架
export const setProductShow = (params:{
  ids: number[]
}) => {
  return request({
    method: 'PUT',
    url: '/product/product/product_show',
    params
  })
}
// 设置产品批量下架
export const setProductUnshow = (params:{
  ids: number[]
}) => {
  return request({
    method: 'PUT',
    url: '/product/product/product_unshow',
    params
  })
}

// 选择商品列表
export const chooseProductList = (params: IProductQuery) => {
  return request<{
       list: IProductData[]
       count: number
     }>({
       method: 'GET',
       url: '/product/product/list',
       params
     })
}

/**
 * -----------------------商品分类----------------------
*/
// 树形列表  0-仅顶级分类 1-所有分类
export const getCategoryTree = (type: number) => {
  return request<ICategoryTree[]>({
    method: 'GET',
    url: `/product/category/tree/${type}`
  })
}
/**
 * -----------------------商品规格----------------------
*/
// 保存新建或编辑
export const saveAttr = (id: number, data: {
  rule_name: string
  spec: string
}) => {
  return request({
    method: 'POST',
    url: `/product/product/rule/${id}`,
    data
  })
}

// 列表
export const attrList = (params: {
  page: number
limit: number
  rule_name: string
}) => {
  return request<{
       list: IAttrList[]
       count: number
     }>({
       method: 'GET',
       url: '/product/product/list',
       params
     })
}

// 删除
export const deleteAttr = (data: {
  ids: string
  all: string
  where: string
}) => {
  return request({
    method: 'DELETE',
    url: '/product/product/rule/delete',
    data
  })
}

// 规则详情
export const getRuleDetail = (id: number) => {
  return request<{
       info: IRuleDetail
     }>({
       method: 'GET',
       url: `/product/product/rule/${id}`
     })
}
/**
 * -----------------------商品评论----------------------
*/
