<template>
  <h1>home</h1>
  <p>{{ $store.state.count }}</p>
  <p>{{ store.state.count }}</p>
  <p class="box">
    {{ $store.state }}
  </p>
  <img src="@/assets/logo.png">
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex'
import { useStore } from '@/store/index' // 除了配置vite的resolve.alias外，还需要设置ts里的paths

const store = useStore()
console.log(store.state.count)

</script>

<style scoped>
.box {
  height: 200px;
  width: 200px;
  background-image: url(@/assets/logo.png);
}
</style>
