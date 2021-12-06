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
  }
})
