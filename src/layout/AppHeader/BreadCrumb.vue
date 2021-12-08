<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in routes"
      :key="item.path"
      :to="item.path"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowRight
} from '@element-plus/icons'

const router = useRouter()
console.log(router.currentRoute.value.matched) // 获取到当前路由匹配到的路径

const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})
</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
.el-breadcrumb {
  display: flex;
  align-items: center;
  line-height: unset;
}
</style>
