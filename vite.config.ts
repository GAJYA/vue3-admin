import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path' // ts文件中加载node核心模块需要安装node类型补充模块，npm i -D @types/node;否则会找不到类型

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false
    }), // 在开发或者构建的过程中把eslint集成在vite里
    vueJsx({
      // 配置项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')// 绝对路径
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";' // 最终是把这个字符串注入到css模块
      }
    }
  },
  server: {
    proxy: {
      // 字符串简写写法
      // 以/foo/123开头的地址都被代理到http://localhost:4567/foo/123
      // '/foo': 'http://localhost:4567',
      // 选项写法
      // '/api': {
      '/admin': {
        // target: 'http://jsonplaceholder.typicode.com', // 代理的目标地址
        target: 'https://shop.fed.lagou.com/api/', // 代理的目标地址
        // 兼容基于名字的虚拟主机
        // 通过http请求头部的origin字段可以获取到域名
        // 在开发阶段，默认的origin是：localhost:3000，服务端可能无法处理
        // changeOrigin: true，代理服务会把origin修改为设置的目标地址`http://jsonplaceholder.typicode.com`
        changeOrigin: true
        // 路径重写
        // 真正的接口地址不存在api的时候，需要把api去掉，此处的api只是方便做规则校验而设置的
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
