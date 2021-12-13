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
// 原生类型可以使用PropType来指定复杂类型
// import { PropType } from '@vue/runtime-core'
// const props = defineProps({
//   page: {
//     type: Number,
//     default: 1
//   },
//   limit: {
//     type: Number,
//     default: 10
//   },
//   listCount: {
//     type: Number,
//     default: 0
//   },
//   loadList: {
//     type: Function,
//     default: () => {}
//   },
//   obj: {
//     type: Object as PropType<{ a: string, b: number }>,
//     required: true
//   }
// })

// 定义接口
interface PropsType {
    page: number
    limit: number
    listCount: number
    loadList: () => void
}
// 使用withDefaults方法来指定默认值
const props = withDefaults(defineProps<PropsType>(), {
  page: 1,
  limit: 10,
  listCount: 0,
  loadList: () => {}
})
// 没有默认值，只指定类型
// const props = defineProps<PropsType>()

interface EmitType {
    // (e: 'update:page', page: number, a: string) : void // 多个参数时候
    (e: 'update:page', page: number) : void
    (e: 'update:limit', limit: number) : void
}
const emit = defineEmits<EmitType>()
// const emit = defineEmits(['update:page', 'update:limit'])

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
