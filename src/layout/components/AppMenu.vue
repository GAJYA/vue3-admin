<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
    :collapse="$store.state.isCollapse"
  >
    <el-menu-item index="/">
      <el-icon><IconMenu /></el-icon>
      <span>主页</span>
    </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/product_list">
        商品管理
      </el-menu-item>
      <el-menu-item index="/product/product_classify">
        商品分类
      </el-menu-item>
      <!-- <el-menu-item-group title="Group Two"> -->
      <el-menu-item index="/product/product_attr">
        商品规格
      </el-menu-item>
      <el-menu-item index="/product/product_reply">
        商品评论
      </el-menu-item>
      <!-- </el-menu-item-group> -->
    </el-sub-menu>
    <el-sub-menu index="/order">
      <template #title>
        <el-icon><IconMenu /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/order_list">
        订单管理
      </el-menu-item>
      <el-menu-item index="/order/offline">
        下线订单
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/media">
      <el-icon><Document /></el-icon>
      <span>媒体</span>
    </el-menu-item>
    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/permission_role">
        角色
      </el-menu-item>
      <el-menu-item index="/permission/permission_admin">
        管理员
      </el-menu-item>
      <el-menu-item index="/permission/permission_rule">
        权限规则
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting
} from '@element-plus/icons'
import { } from 'vue'

</script>

<style>
.el-menu {
  border-right: null;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
