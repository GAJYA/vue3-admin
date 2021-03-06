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
          ref="tree"
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
import { ref, nextTick } from 'vue'
import type { IElForm, IFormRule, IElTree } from '@/types/element-plus'
import type { IRoleMenu } from '@/api/types/role'
import { getRolePermission, saveRole, getRoleInfo } from '@/api/role'
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
const tree = ref<IElTree | null>(null)
// const menus = ref<IRoleMenu[] | null>(null)

const props = defineProps({
  roleId: { // 编辑的管理员ID
    type: Number as PropType<number>,
    default: 0
  }
})

interface EmitType {
    (e: 'update:role-id', roleId: number) : void
    (e: 'success') : void
}
const emit = defineEmits<EmitType>()

const loadRolePermission = async () => {
  const data = await getRolePermission()
  menus.value = data.menus
}

const loadRoleInfo = async () => {
  if (!props.roleId) return
  const { role, menus: menusData } = await getRoleInfo(props.roleId)
  menus.value = menusData
  // 获取到DOM元素后再进行赋值
  await nextTick()
  formData.value.role_name = role.role_name
  formData.value.status = role.status
  setDefaultCheckbox(role.rules.split(',').map(item => Number.parseInt(item)))
}
const setDefaultCheckbox = (menus: number[]) => {
  menus.forEach(item => {
    // 判断是否是子节点，如果是子节点再选中
    const node = tree.value?.getNode(item)
    if (node && node.isLeaf) {
      // 设置选中状态
      tree.value?.setChecked(item, true, true)
    }
  })
}
const handleDialogOpen = () => {
  formLoading.value = true
  props.roleId
    ? loadRoleInfo().finally(() => { formLoading.value = false })
    : loadRolePermission().finally(() => { formLoading.value = false })
}
const handleDialogClosed = () => {
  emit('update:role-id', 0)
  form.value?.clearValidate() // 清除验证信息
  form.value?.resetFields() // 清除表单数据
}

const handleConfirm = async () => {
  // 校验表单，强制触发验证
  const valid = await form.value?.validate()
  if (!valid) return
  formData.value.checked_menus = tree.value?.getCheckedKeys(true).concat(tree.value?.getHalfCheckedKeys()) as number[]
  // console.log(tree.value?.getCheckedKeys(true))
  // console.log(tree.value?.getHalfCheckedKeys())
  // 添加管理员
  await saveRole(props.roleId, formData.value)
  emit('success')
  ElMessage.success('保存成功')
}
</script>

<style lang="scss" scoped>

</style>
