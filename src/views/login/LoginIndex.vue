<template>
  <h1>login</h1>
</template>

<script lang="ts" setup>
import { getLogInfo } from '@/api/common'
import { onMounted } from '@vue/runtime-core'

onMounted(() => {
  getLogInfo().then(res => {
    console.log(res)
  })
})

</script>
