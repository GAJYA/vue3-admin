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
          @change="loadList"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.html+item.cate_name"
            :value="item.id"
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
        <el-radio-group
          v-model="radio"
          @change="handleRadioChange"
        >
          <el-radio
            v-for="item in radioGroup"
            :key="item.type"
            :label="item.type"
          >
            {{ item.name }}
            {{ item.count?`(${item.count})`:'' }}
          </el-radio>
        </el-radio-group>
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
          v-if="listParams.type === 2"
          @click="handleProductShow"
        >
          批量上架
        </el-button>
        <el-button
          class="button"
          v-else
          @click="handleProductUnShow"
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
      @selection-change="handleSelectionChange"
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
        type="selection"
        width="35"
      />
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
        width="130"
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
import type { IProductData, IHeader, ICategoryTree } from '@/api/types/product'
import { getProductList, deleteProduct, updateProductStatus, getTypeHeader, getCategoryTree, setProductShow, setProductUnshow } from '@/api/product'
// import { getProductList, deleteProduct, updateProductStatus, getProductClassify } from '@/api/product'
import AppPagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
import RoleForm from './ProductForm.vue'
import { Search } from '@element-plus/icons-vue'

const options = ref<ICategoryTree[]>([])
const list = ref<IProductData[]>([])
const listCount = ref(0)
const listParams = reactive({
  page: 1,
  limit: 10,
  store_name: '',
  sales: 1,
  cate_id: '',
  type: 0 // 商品类目
})
const radioGroup = ref<IHeader[]>([])
const listLoading = ref(true)
const dialogVisible = ref(false)
const roleId = ref(0)
const radio = ref(0)
const selectedIds = ref<number[]>([])
onMounted(async () => {
  loadProductClassify()
  loadList()
  loadHeader()
})
const loadProductClassify = async () => {
  const res = await getCategoryTree(1)
  options.value = res
  console.log('getCategoryTree', res)
}
const loadHeader = async () => {
  const res = await getTypeHeader()
  radioGroup.value = res.list
  // 添加【全部】这个选项
  radioGroup.value.splice(0, 0, {
    type: 0,
    name: '全部'
  })
  console.log('header:', res)
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

const handleRadioChange = async () => {
  listParams.type = radio.value
  loadList()
}
// 多选框选中的项
const handleSelectionChange = async (val: IProductData[]) => {
  selectedIds.value = val.map(item => item.id)
}
// 批量上架
const handleProductShow = async () => {
  await setProductShow({ ids: selectedIds.value })
  loadList()
}
// 批量下架
const handleProductUnShow = async () => {
  await setProductUnshow({ ids: selectedIds.value })
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
