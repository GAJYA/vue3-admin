import { App } from '@vue/runtime-dom'
import Component from './test.vue'

export default {
  install (app: App) {
    app.component('AppTextEditor', Component)
  }
}
