<template>
  <h1>home</h1>
  <p>{{ $store.state.count }}</p>
  <p>{{ store.state.count }}</p>
  <p>{{ $store.state }}</p>
</template>

<script lang="ts" setup>
// import { useStore } from 'vuex'
import { useStore } from '../../store/index'

const store = useStore()
console.log(store.state.count)

</script>
