import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: 'permission',
    name: '',
    component: RouterView,
    meta: {
      title: '权限'
    },
    children: [
      {
        path: 'permission_role',
        name: 'permission_role',
        component: () => import('@/views/permission/role/index.vue'),
        meta: {
          title: '角色'
        }
      },
      {
        path: 'permission_admin',
        name: 'permission_admin',
        component: () => import('@/views/permission/admin/index.vue'),
        meta: {
          title: '管理员'
        }
      },
      {
        path: 'permission_rule',
        name: 'permission_rule',
        component: () => import('@/views/permission/rule/index.vue'),
        meta: {
          title: '权限规则'
        }
      }
    ]
  }
]

export default routes
