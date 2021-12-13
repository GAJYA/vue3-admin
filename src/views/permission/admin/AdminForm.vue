<template>
  <app-dialog-form
    :title="props.adminId ? '编辑管理员' : '添加管理员'"
    @closed="emit('update:admin-id', null)"
  >
    <span>This is a message</span>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import AppDialogForm from '@/components/DialogForm/index.vue'
import type { PropType } from 'vue'
const props = defineProps({
  adminId: { // 编辑的管理员ID
    type: Number as PropType<number | null>,
    default: null
  }
})

interface EmitType {
    (e: 'update:admin-id', adminId: number | null) : void
}
const emit = defineEmits<EmitType>()

</script>

<style lang="scss" scoped>

</style>
