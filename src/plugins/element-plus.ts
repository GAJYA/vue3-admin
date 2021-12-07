import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// Element Plus 组件 默认 使用英语,配置成中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { App } from 'vue'

export default {
  install (app: App) {
    app.use(ElementPlus, { size: 'small', zIndex: 2000, locale: zhCn }) // size设置默认的全局的样式大小
  }
}
