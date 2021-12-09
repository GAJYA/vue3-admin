<template>
  <el-dropdown size="medium">
    <span class="el-dropdown-link">
      {{ $store.state.userInfo?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { } from 'vue'
import { ArrowDown } from '@element-plus/icons'

</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
.el-dropdown{
    margin: 0 10px;
}
</style>
