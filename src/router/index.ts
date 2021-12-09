import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import products from './modules/product'
import order from './modules/order'
import media from './modules/media'
import permission from './modules/permission'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/AppLayout.vue'),
    meta: {
      title: '首页'
    },
    children: [
      {
        name: 'home',
        path: '', // 默认子路由
        component: () => import('../views/home/HomeIndex.vue')
      },
      ...products,
      ...order,
      ...media,
      ...permission
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式 createHistory()
  routes // 路由规则
})

router.beforeEach(() => {
  nprogress.start() // 开始加载进度条
})

router.afterEach(() => {
  nprogress.done() // 结束加载进度条
})

export default router
