
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import type { IUserInfo } from '@/api/types/common'
import { getItem, setItem } from '@/utils/storage'
import { USER } from '@/utils/constants'

const state = {
  count: 0,
  isCollapse: false,
  userInfo: getItem<{token: string} & IUserInfo>(USER) // 转换回对象或null
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
      setItem(USER, payload)
    }
  }
})
// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
