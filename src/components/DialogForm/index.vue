<template>
  <el-dialog
    ref="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          @click="emit('confirm')"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { IElDialog } from '@/types/element-plus'

interface EmitType {
    (e: 'confirm') : void
}
const emit = defineEmits<EmitType>()

const dialog = ref<IElDialog | null>(null)

const handleCancel = () => {
  // 通过操纵组件实例的方法操作弹框的展示状态
  if (dialog.value) {
    dialog.value.visible = false
  }
}
</script>

<style lang="scss" scoped>
.el-dialog__header{
    text-align: left;
}
</style>
