<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AppMenu />
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <ToggleSidebar />
            <Breadcrumb />
          </div>
          <div class="right">
            <SearchInput />
            <FullScreen />
            <NotifyInfo />
            <p>admin</p>
          </div>
        </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from './components/AppMenu.vue'
import ToggleSidebar from './AppHeader/ToggleSidebar.vue'
import Breadcrumb from './AppHeader/BreadCrumb.vue'
import SearchInput from './AppHeader/SearchInput.vue'
import FullScreen from './AppHeader/FullScreen.vue'
import NotifyInfo from './AppHeader/NotifyInfo.vue'

</script>
<style lang="scss" scoped>
.el-header{
  background-color: #fff;
  color: var(--el-text-color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left, .right{
  display: flex;
  align-items: center;
  width: 50%;
}
.right{
  justify-content: flex-end;
}

.el-aside {
  width: auto;
  background-color: #545c64;
  color: var(--el-text-color-primary);
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}

.el-container {
    height: 100vh;
}

</style>
