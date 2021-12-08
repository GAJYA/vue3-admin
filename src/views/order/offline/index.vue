<template>
  <h1>订单支付</h1>
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex'
import { useStore } from '@/store/index' // 除了配置vite的resolve.alias外，还需要设置ts里的paths
const store = useStore()
console.log(store.state.count)

</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
p{
  color: $color;
}
</style>
