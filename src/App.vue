<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent, ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Abc from './components/AnchoredHeading.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Abc
  },
  setup (props) {
    const helloWorld = ref<InstanceType<typeof HelloWorld> | null>(null)
    onMounted(() => {
      console.log(helloWorld.value?.$props) // 获取helloworld组件中的内容
    })
    return { helloWorld }
  }
})
</script>

<template>
  <h1>App</h1>
  <HelloWorld
    ref="helloWorld"
    msg="Hello Vue 3 + TypeScript + Vite"
    :sum="1"
  />
  <Abc />
  <router-link to="/">
    Home
  </router-link>
  <router-link to="/login">
    login
  </router-link>
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
  margin-top: 60px;
}
</style>
