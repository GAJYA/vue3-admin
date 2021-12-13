<template>
  <el-pagination
    :current-page="props.page"
    :page-sizes="[2, 3, 4]"
    :page-size="props.limit"
    layout="total, sizes, prev, pager, next, jumper"
    :total="listCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  listCount: {
    type: Number,
    default: 0
  },
  loadList: {
    type: Function,
    default: () => {}
  }
})

const emit = defineEmits(['update:page', 'update:limit'])

const handleSizeChange = (size: number) => {
  emit('update:page', 1)
  emit('update:limit', size)
  props.loadList()
}
const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}

</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';

</style>
