<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>数据筛选</span>
      </div>
    </template>
    <el-form
      ref="form"
      :model="listParams"
      :disabled="listLoading"
      @submit.prevent="handleQuery"
    >
      <el-form-item />
      <el-form-item label="商品分类">
        <el-select
          v-model="listParams.cate_id"
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
      <el-form-item label="商品名称">
        <el-col :span="12">
          <el-input
            size="medium"
            v-model="listParams.store_name"
            clearable
            placeholder="请输入商品名称关键字"
          >
            <template #append>
              <el-button :icon="Search" />
            </template>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品类目">
        <el-radio-group v-model="radio">
          <el-radio :label="3">
            全部
          </el-radio>
          <el-radio :label="6">
            出售中的商品
          </el-radio>
          <el-radio :label="9">
            仓库中的商品
          </el-radio>
        </el-radio-group>
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
          添加商品
        </el-button>
        <el-button
          class="button"
          @click="dialogVisible = true"
        >
          批量上架
        </el-button>
        <el-button
          class="button"
          @click="dialogVisible = true"
        >
          批量下架
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
        type="expand"
      >
        <template #default="props">
          <p>State: {{ props.row.id }}</p>
          <p>City: {{ props.row.role_name }}</p>
          <p>Address: {{ props.row.rules }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="商品ID"
      />
      <el-table-column
        label="商品图片"
      >
        <template #default="props">
          <img
            :src="props.row.image"
            width="100"
            height="100"
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="store_name"
        label="商品名称"
        min-width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="price"
        label="商品售价"
      />
      <el-table-column
        prop="sales"
        label="销量"
        sortable
      />
      <el-table-column
        prop="postage"
        label="库存"
      />
      <el-table-column
        prop="sort"
        label="排序"
      />
      <el-table-column
        label="状态"
        width="150"
      >
        <template #default="scope">
          <el-switch
            v-model="scope.row.is_show"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="上架"
            inactive-text="下架"
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
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row.id)"
          >
            查看评论
          </el-button>
          <el-popconfirm
            title="确定要移除当前内容吗？"
            @confirm="handleDelete(scope.row.id)"
          >
            <template #reference>
              <el-button
                size="mini"
                type="text"
              >
                移到回收站
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
import type { IProductData } from '@/api/types/product'
import { getProductList, deleteProduct, updateProductStatus } from '@/api/product'
// import { getProductList, deleteProduct, updateProductStatus, getProductClassify } from '@/api/product'
import AppPagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
import RoleForm from './ProductForm.vue'
import { Search } from '@element-plus/icons-vue'

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
const list = ref<IProductData[]>([])
const listCount = ref(0)
const listParams = reactive({
  page: 1,
  limit: 10,
  store_name: '',
  sales: 1,
  cate_id: '5',
  type: 0
})
const listLoading = ref(true)
const dialogVisible = ref(false)
const roleId = ref(0)
const radio = ref(3)
onMounted(async () => {
  loadProductClassify()
  loadList()
})
const loadProductClassify = async () => {
  // const res = await getProductClassify(1)
  // console.log(res)
  console.log('clsssify')
}
const loadList = async () => {
  listLoading.value = true
  const res = await getProductList(listParams).finally(() => {
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
  await deleteProduct(id)
  ElMessage({
    message: '已成功删除',
    type: 'success'
  })
  loadList()
}

const handleStatusChange = async (item: IProductData) => {
  item.statusLoading = true
  await updateProductStatus(item.id, item.is_show).finally(() => {
    item.statusLoading = false
  })
  ElMessage.success(`${item.is_show === 1 ? '启用' : '禁用'}成功`)
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
  align-items: center;
  text-align: left;
}

.el-form{
  text-align: left;
}

</style>
