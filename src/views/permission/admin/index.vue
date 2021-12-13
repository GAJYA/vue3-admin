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
      <el-form-item label="管理员名称">
        <el-input
          v-model="listParams.name"
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
          添加管理员
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
        prop="real_name"
        label="姓名"
      />
      <el-table-column
        prop="account"
        label="账号"
      />
      <el-table-column
        prop="roles"
        label="身份"
        min-width="150"
      >
        <template #default="scope">
          <el-space wrap>
            <el-tag
              class="role-tag"
              v-for="value in scope.row.roles.split(',')"
              :key="value"
            >
              {{ value }}
            </el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_time"
        label="最后一次登录时间"
      />
      <el-table-column
        prop="last_ip"
        label="最后一次登录IP"
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
    <!-- <el-pagination
      v-model:currentPage="listParams.page"
      :page-sizes="[2, 3, 4]"
      :page-size="listParams.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <AppPagination
      v-model:page="listParams.page"
      v-model:limit="listParams.limit"
      :list-count="listCount"
      :load-list="loadList"
      :disabled="listLoading"
    />
  </el-card>
  <AdminForm
    v-model="dialogVisible"
    v-model:admin-id="adminId"
    @closed="adminId = null"
    @success="handleSuccess"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { IListParams, IListData } from '@/api/types/admin'
import { getAdminList, deleteAdmin, updateAdminStatus } from '@/api/admin'
import AppPagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
import AdminForm from './AdminForm.vue'

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
const list = ref<IListData[]>([])
const listCount = ref(0)
const listParams = reactive({
  page: 1,
  limit: 2,
  name: '',
  roles: '',
  status: '' as IListParams['status'] // status必须加引号否则会读取为变量
})
const listLoading = ref(true)
const dialogVisible = ref(false)
const adminId = ref<number | null>(null)
onMounted(async () => {
  loadList()
})
const loadList = async () => {
  listLoading.value = true
  const res = await getAdminList(listParams).finally(() => {
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
  await deleteAdmin(id)
  ElMessage({
    message: '已成功删除',
    type: 'success'
  })
  loadList()
}

const handleStatusChange = async (item: IListData) => {
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.status === 1 ? '启用' : '禁用'}成功`)
}
const handleEdit = (id: number) => {
  dialogVisible.value = true
  adminId.value = id
  console.log(id)
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
