<template>
  <h1>login</h1>
</template>

<script lang="ts" setup>
// 在script setup语法中，会把所有加载的模块都当做值导出来用，所以ts的类型需要前面加上type
// type表示显式告诉加载的是一个类型
import type { LoginInfo } from '@/api/types/common'
import { getLogInfo } from '@/api/common'
import { onMounted, ref } from '@vue/runtime-core'

const list = ref<LoginInfo['slide']>([])
onMounted(() => {
  getLogInfo().then(res => {
    // res: axios包装的响应数据，包括data，status等
    // res.data：后端真实返回的数据
    // console.log(res.data)
    console.log(res)
    list.value = res.slide
    console.log(list.value[0])
  })
})

</script>
