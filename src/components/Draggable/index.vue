<template>
  <div ref="draggableContainer">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import Sortable from 'sortablejs'

const draggableContainer = ref<HTMLDivElement | null>(null)
const props = defineProps({
  modelValue: {
    type: Array as PropType<any>,
    default: () => []
  },
  // 可选属性参考https://github.com/SortableJS/Sortable
  options: {
    type: Object as PropType<any>,
    default: () => {}
  }
})
interface EmitType {
  (e: 'update:model-value', activities: any[]) : void
}
const emit = defineEmits<EmitType>()

onMounted(async () => {
  initDraggable()
})
const initDraggable = () => {
  // eslint-disable-next-line quotes
  if (!draggableContainer.value) {
    console.error('容器不能为空')
    return
  }
  const sortable = Sortable.create(draggableContainer.value, {
    animation: 300, // 动画
    onUpdate: (e) => {
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 删除拖拽的元素
        const list = props.modelValue.slice(0)
        const item = list.splice(e.oldIndex, 1) // 返回删除的元素
        // 把删除的元素放在新的位置(插入新元素)
        list.splice(e.newIndex, 0, item[0])
        emit('update:model-value', list)
      }
    },
    ...props.options // 解构的方式覆盖默认的选项
  })
  console.log(sortable)
}

</script>

<style lang="scss" scoped>
:deep(.el-tag+.el-tag){
  margin-left: 10px;
}
</style>
