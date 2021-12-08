import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/order',
    name: '',
    component: RouterView,
    meta: {
      title: '订单'
    },
    children: [
      {
        path: 'order_list',
        name: 'order_list',
        component: () => import('@/views/order/list/index.vue'),
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'offline',
        name: 'order_offline',
        component: () => import('@/views/order/offline/index.vue'),
        meta: {
          title: '下线订单'
        }
      }
    ]
  }
]

export default routes
