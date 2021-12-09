import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    title?: string,
    requiresAuth?: boolean // 是否需要登录才能访问
  }
}
