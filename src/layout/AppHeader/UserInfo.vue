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
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons'
import { ElMessageBox, ElMessage } from 'element-plus'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleLogout = () => {
  // 退出提示
  ElMessageBox.confirm(
    '确认退出吗？',
    'Warning',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(async () => {
      // 确认发出退出请求
      await logout()
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
      // 跳转回登录页
      router.push({
        name: 'login'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出'
      })
    })
}
</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
.el-dropdown{
    margin: 0 10px;
}
</style>
