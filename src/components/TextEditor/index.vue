<template>
  <div id="editor">
    <p>初始的内容</p>
  </div>
</template>

<script lang="ts" setup>
import Wangeditor from 'wangeditor'
import { onMounted, ref, watch } from 'vue'

const editor = ref<InstanceType<typeof Wangeditor> | null>(null)
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
onMounted(async () => {
  await initEditor()
})
// 通过watch监听modelValue的值来解决异步修改的数据无法重新设置给编辑器的问题
const unWatchModelValue = watch(() => props.modelValue, () => {
  editor.value?.txt.html(props.modelValue) // 重新设置编辑器内容
  // 监听一次后，取消监听；如果不取消会发现光标没办法下移，每次都会回到上一行末尾，因为修改父组件内容会不停触发watch监听
  unWatchModelValue()
})

interface EmitType {
    (e: 'update:model-value', value: string) : void
}
const emit = defineEmits<EmitType>()

// 异步修改编辑器内容情况
setTimeout(() => {
  emit('update:model-value', '<h1>2秒后</h1>')
}, 2000)

// 初始化
const initEditor = () => {
  editor.value = new Wangeditor('#editor')
  // 配置 onchange 回调函数，父组件修改内容后拿到新内容
  editor.value.config.onchange = function (newHtml: string) {
    emit('update:model-value', newHtml)
  }
  // 设置编辑区域高度为 490px
  editor.value.config.height = 490
  // 注意，先配置 height ，再执行 create()
  editor.value.create()
  // editor.value.txt.html(props.modelValue) // 重新设置编辑器内容
}

</script>

<style lang="scss" scoped>

</style>
