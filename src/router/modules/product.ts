import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/product', // `/`加上的情况下就是一个绝对路径，比如子路由前加上`/`就不会拼接子路由地址，直接找的是设置的子路由，可能会找不到页面
    name: '',
    component: RouterView,
    meta: {
      title: '商品'
    },
    children: [
      {
        path: 'product_list', // `/product_list`会找不到页面
        name: 'product_list',
        component: () => import('@/views/product/list/index.vue'),
        meta: { // 自定义路由元数据
          title: '商品列表',
          requiresAuth: true
        }
      },
      {
        path: 'product_add',
        name: 'product_add',
        component: () => import('@/views/product/add/index.vue'),
        meta: { // 自定义路由元数据
          title: '商品添加',
          requiresAuth: true
        }
      },
      {
        path: 'product_classify',
        name: 'product_classify',
        component: () => import('@/views/product/classify/index.vue'),
        meta: {
          title: '商品分类',
          requiresAuth: true
        }
      },
      {
        path: 'product_attr',
        name: 'product_attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '商品规格'
        }
      },
      {
        path: 'product_reply',
        name: 'product_reply',
        component: () => import('@/views/product/reply/index.vue'),
        meta: {
          title: '商品评论'
        }
      }
    ]
  }
]

export default routes
