import { createApp } from 'vue'
import App from './App.vue'
// import.meta.env // 获取环境变量
import router from './router'
import { store, key } from './store'

// 加载全局样式
import '@/styles/index.scss'
console.log(import.meta.env)

createApp(App).use(router).use(store, key).mount('#app')
