<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>数据筛选</span>
      </div>
    </template>
    <el-form
      ref="form"
      inline="true"
      :model="listParams"
      :disabled="listLoading"
      @submit.prevent="handleQuery"
    >
      <el-form-item />
      <el-form-item label="状态">
        <el-select
          v-model="listParams.status"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="身份昵称">
        <el-input
          v-model="listParams.role_name"
          clearable
          placeholder="请输入身份昵称"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="submit"
          @click="handleQuery"
        >
          查询
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button
          class="button"
          type="primary"
          @click="dialogVisible = true"
        >
          添加角色
        </el-button>
      </div>
    </template>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
      v-loading="listLoading"
    >
      <el-table-column
        prop="id"
        label="id"
        width="80"
      />
      <el-table-column
        prop="role_name"
        label="身份昵称"
      />
      <el-table-column
        prop="rules"
        label="权限"
        min-width="150"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :loading="scope.row.statusLoading"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template #default="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-popconfirm
            title="确定要删除当前内容吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="mini"
                type="text"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <AppPagination
      v-model:page="listParams.page"
      v-model:limit="listParams.limit"
      :list-count="listCount"
      :load-list="loadList"
      :disabled="listLoading"
    />
  </el-card>
  <RoleForm
    v-model="dialogVisible"
    v-model:role-id="roleId"
    @closed="roleId = 0"
    @success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { IRoleParams, IRoleData } from '@/api/types/role'
import { getRoleList, deleteRole, updateRoleStatus } from '@/api/role'
import AppPagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
import RoleForm from './RoleForm.vue'

const options = ref([
  {
    value: '',
    label: '全部'
  },
  {
    value: 1,
    label: '显示'
  },
  {
    value: 0,
    label: '不显示'
  }
])
const list = ref<IRoleData[]>([])
const listCount = ref(0)
const listParams = reactive({
  page: 1,
  limit: 2,
  role_name: '',
  status: '' as IRoleParams['status'] // status必须加引号否则会读取为变量
})
const listLoading = ref(true)
const dialogVisible = ref(false)
const roleId = ref(0)
onMounted(async () => {
  loadList()
})
const loadList = async () => {
  listLoading.value = true
  const res = await getRoleList(listParams).finally(() => {
    listLoading.value = false
  })
  res.list.forEach(item => {
    item.statusLoading = false // 管理员状态修改时的loading
  })
  list.value = res.list
  listCount.value = res.count
}
const handleQuery = async () => {
  loadList()
}
const handleDelete = async (id: number) => {
  await deleteRole(id)
  ElMessage({
    message: '已成功删除',
    type: 'success'
  })
  loadList()
}

const handleStatusChange = async (item: IRoleData) => {
  item.statusLoading = true
  await updateRoleStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}
const handleEdit = (id: number) => {
  dialogVisible.value = true
  roleId.value = id
}
// 点击确定后关闭弹窗，重新获取列表
const handleSuccess = () => {
  dialogVisible.value = false
  loadList()
}
</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';
.el-card{
  margin-bottom: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.el-form{
  text-align: left;
}

</style>
