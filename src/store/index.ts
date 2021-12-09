
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import type { IUserInfo } from '@/api/types/common'

const state = {
  count: 0,
  isCollapse: false,
  userInfo: JSON.parse(window.localStorage.getItem('userInfo') || 'null') as IUserInfo | null // 转换回对象或null
}
// 用type把state导出去供vuex.d.ts使用
export type State = typeof state

export const key: InjectionKey<Store<State>> = Symbol('')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.userInfo = payload
      // setItem只能存储字符串，直接存储对象，ts会报错
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  }
})
// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
