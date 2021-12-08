<template>
  <el-input
    v-model="input"
    placeholder="请输入内容"
    :prefix-icon="Search"
    size="mini"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Search
} from '@element-plus/icons'

const input = ref('')

</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';

</style>
