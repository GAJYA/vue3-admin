<template>
  <el-icon
    :size="20"
    @click="toggleFullScreen"
  >
    <full-screen />
  </el-icon>
</template>

<script lang="ts" setup>
import {
  FullScreen
} from '@element-plus/icons'

// 切换侧边菜单
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-icon{
    margin: 0 10px;
  }
</style>
