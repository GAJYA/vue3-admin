<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {

  },
  setup (props) {

  }
})
</script>

<template>
  <!-- <router-link to="/">
    Home
  </router-link>
  <router-link to="/login">
    login
  </router-link> -->
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
