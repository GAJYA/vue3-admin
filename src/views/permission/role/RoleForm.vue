<template>
  <app-dialog-form
    :title="props.roleId ? '编辑角色' : '添加角色'"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
    :confirm="handleConfirm"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item
        label="身份名称"
        prop="role_name"
      >
        <el-input
          v-model="formData.role_name"
          placeholder="请输入身份昵称"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio
            :label="1"
          >
            开启
          </el-radio>
          <el-radio
            :label="0"
          >
            关闭
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限">
        <el-tree
          node-key="id"
          show-checkbox
          :data="menus"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import AppDialogForm from '@/components/DialogForm/index.vue'
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { IElForm, IFormRule } from '@/types/element-plus'
import type { IRoleMenu } from '@/api/types/role'
import { getRolePermission, getRoleInfo } from '@/api/role'
// import { getRolePermission, createRole, getRoleInfo } from '@/api/role'
import { ElMessage } from 'element-plus'

const form = ref<IElForm | null>(null)
const formData = ref({
  checked_menus: [] as number[],
  status: 0 as 0 | 1,
  role_name: ''
})

const formRules: IFormRule = {
  role_name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ]
}
const formLoading = ref(false)
const menus = ref<IRoleMenu[]>([])

// const menus = ref<IRoleMenu[] | null>(null)

const props = defineProps({
  roleId: { // 编辑的管理员ID
    type: Number as PropType<number | null>,
    default: null
  }
})

interface EmitType {
    (e: 'update:role-id', roleId: number | null) : void
    (e: 'success') : void
}
const emit = defineEmits<EmitType>()

const loadRolePermission = async () => {
  const data = await getRolePermission()
  // menus.value = data
  console.log(data)
}

const loadRoleInfo = async () => {
  if (!props.roleId) return
  const data = await getRoleInfo(props.roleId)
  menus.value = data.menus
}
const handleDialogOpen = () => {
  formLoading.value = true
  Promise.all([loadRolePermission(), loadRoleInfo()]).finally(() => {
    formLoading.value = false
  })
}
const handleDialogClosed = () => {
  emit('update:role-id', null)
  form.value?.clearValidate() // 清除验证信息
  form.value?.resetFields() // 清除表单数据
}

const handleConfirm = async () => {
  // 校验表单，强制触发验证
  const valid = await form.value?.validate()
  if (!valid) return
  // 添加管理员
  // await createRole(props.roleId, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}
</script>

<style lang="scss" scoped>

</style>
