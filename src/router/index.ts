import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/AppLayout.vue'),
    children: [
      {
        name: 'home',
        path: '', // 默认子路由
        component: () => import('../views/home/HomeIndex.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login/LoginIndex.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式 createHistory()
  routes // 路由规则
})

export default router
