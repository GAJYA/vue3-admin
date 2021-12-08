<template>
  <div @click="handleCollapse">
    <el-icon
      :size="20"
      style="vertical-align: middle;"
      v-show="!store.state.isCollapse"
    >
      <fold />
    </el-icon>
    <el-icon
      :size="20"
      v-show="store.state.isCollapse"
    >
      <expand />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex'
import {
  Fold,
  Expand
} from '@element-plus/icons'
import { useStore } from '@/store/index' // 除了配置vite的resolve.alias外，还需要设置ts里的paths
const store = useStore()

// 切换侧边菜单
const handleCollapse = () => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}

</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
div{
  display: inline-block;
  margin-right: 10px;
}
</style>
