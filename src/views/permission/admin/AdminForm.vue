<template>
  <app-dialog-form
    :title="props.adminId ? '编辑管理员' : '添加管理员'"
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
        label="管理员账号"
        prop="account"
      >
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号"
        />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd"
      >
        <el-input
          v-model="formData.pwd"
          placeholder="请输入管理员密码"
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd"
      >
        <el-input
          v-model="formData.conf_pwd"
          placeholder="请输入确认密码"
        />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name"
      >
        <el-input
          v-model="formData.real_name"
          placeholder="请输入管理员姓名"
        />
      </el-form-item>
      <el-form-item
        label="管理员身份"
        prop="roles"
      >
        <el-select
          v-model="formData.roles"
          multiple
          placeholder="请选择管理员身份"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import AppDialogForm from '@/components/DialogForm/index.vue'
import type { PropType } from 'vue'
import { ref } from 'vue'
import type { IElForm, IFormRule } from '@/types/element-plus'
import type { ISelectOptions } from '@/api/types/form'
import { getRoles, getAdmin, createAdmin, updateAdmin } from '@/api/admin'
import { ElMessage } from 'element-plus'

const form = ref<IElForm | null>(null)
const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})

const formRules: IFormRule = {
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
}
const formLoading = ref(false)

const roles = ref<ISelectOptions[] | null>(null)

const props = defineProps({
  adminId: { // 编辑的管理员ID
    type: Number as PropType<number | null>,
    default: null
  }
})

interface EmitType {
    (e: 'update:admin-id', adminId: number | null) : void
    (e: 'success') : void
}
const emit = defineEmits<EmitType>()

const loadRoles = async () => {
  const data = await getRoles()
  roles.value = data
  console.log(data)
}

const loadAdmin = async () => {
  if (!props.adminId) return
  const data = await getAdmin(props.adminId)
  formData.value = data
}
const handleDialogOpen = () => {
  formLoading.value = true
  //   loadRoles().finally(() => {
  //     formLoading.value = false
  //   })
  //   loadAdmin().finally(() => {
  //     formLoading.value = false
  //   })
  //   等所有接口都调用完后再关闭loading
  Promise.all([loadRoles(), loadAdmin()]).finally(() => {
    formLoading.value = false
  })
}
const handleDialogClosed = () => {
  emit('update:admin-id', null)
  form.value?.clearValidate() // 清除验证信息
  form.value?.resetFields() // 清除表单数据
}

const handleConfirm = async () => {
  // 校验表单，强制触发验证
  const valid = await form.value?.validate()
  if (!valid) return

  if (props.adminId) {
    // 更新管理员
    await updateAdmin(props.adminId, formData.value)
  } else {
    // 添加管理员
    await createAdmin(formData.value)
  }
  emit('success')
  ElMessage.success('保存成功')
}
</script>

<style lang="scss" scoped>

</style>
