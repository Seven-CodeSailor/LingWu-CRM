<template>
  <div class="Regional">
    <BaseDataList
      title="地区管理"
      :tableColumnAttribute="tableColumnAttribute"
      :tableData="regionalStore.tableData"
      :handleDelete="handleDelete"
      :handleEdit="handleEdit"
      :total="regionalStore.total"
      :pageSizes="[5, 10, 15]"
      :usePagination="true"
      @update-table-data="
        (pageSize, pageIndex) => {
          getTableData({
            pageSize,
            pageIndex
          })
        }
      "
      ref="baseDataListRef"
    >
      <template #ico>
        <el-icon><icon-message-box /></el-icon>
      </template>
      <!-- 左边树形菜单 -->
      <template #treeMeau>
        <el-card class="card">
          <template #header>
            <div class="card-header">
              <span>地区管理</span>
              <el-button>刷新</el-button>
            </div>
          </template>
          <el-tree
            :data="regionalStore.areaTreeData"
            highlight-current="true"
            default-expand-all="true"
            draggable
            empty-text="树形菜单内容为空"
            @node-click="handleNodeClick"
          />
        </el-card>
      </template>
      <template #menu
        ><div class="content">
          <div class="left">
            <el-button type="primary" @click="handleAdd">添加数据</el-button>
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="请输入搜索名称"
              style="margin: 0 4px; width: 200px"
            />
            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="handleSearch"
            >
              <el-icon style="margin-right: 4px"><icon-search /></el-icon
              >搜索</el-button
            >
          </div>
        </div>
      </template>
    </BaseDataList>
    <RegionalForm
      ref="regionalFormRef"
      :title="title"
      :area-tree-data="regionalStore.areaTreeData"
    ></RegionalForm>
  </div>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import RegionalForm from './RegionalForm.vue'
import { useRegionalStore } from '@/stores/basic-data/regional/regional'
import { ref, onMounted } from 'vue'
const regionalFormRef = ref(null)
const regionalStore = useRegionalStore()
const title = ref('')

const tableColumnAttribute = [
  {
    prop: 'name',
    label: '地区名称'
  },
  {
    prop: 'intro',
    label: '地区描述'
  },
  {
    prop: 'sort',
    label: '排序',
    sortable: true
  },
  {
    prop: 'visible',
    label: '是否启用',
    useSwitch: true
  }
]
const baseDataListRef = ref(null)
const getTableData = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await regionalStore.getListAreaItem(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}
const deleteTableData = async (params) => {
  return await regionalStore.deleteAreaItem(params)
}
// 传入删除操作的函数就会显示删除按钮
const handleDelete = async (row) => {
  await deleteTableData({ id: row.id })
    .then((res) => {
      ElMessage({
        message: res.message,
        type: 'success'
      })
    })
    .catch((err) => {
      console.log('error', err)
    })
  getTableData({
    pageSize: baseDataListRef.value.paginationData.pageSize,
    pageIndex: baseDataListRef.value.paginationData.currentpage
  })
}
const handleEdit = (row) => {
  console.log('编辑', row)
  const { name, intro, sort, visible, id } = row
  regionalFormRef.value.visible = true
  // treeData的数据回显

  const data = findObjectById(regionalStore.areaTreeData, id)
  console.log('d', data)
  title.value = '修改'
  // 数据回显
  regionalFormRef.value.form = { name, intro, sort, visible }
}

const findObjectById = (arr, parentID) => {
  for (const obj of arr) {
    if (obj.parentID === parentID) {
      return obj
    }
    if (obj.children && obj.children.length > 0) {
      const result = findObjectById(obj.children, parentID)
      if (result) {
        return result
      }
    }
  }
  return null
}

const addTableData = (params) => {}
const inputValue = ref('')
const handleSearch = async () => {
  if (!inputValue.value) {
    ElMessage({
      type: 'danger',
      message: '输入不能为空'
    })
  } else {
    await getTableData({
      pageSize: 5,
      pageIndex: 1,
      name: inputValue
    })
  }
}
const handleAdd = () => {
  title.value = '添加'
  regionalFormRef.value.visible = true
}

onMounted(() => {
  getTableData({ pageSize: 5, pageIndex: 1 })
})
</script>

<style lang="scss" scoped>
.Regional {
  .card {
    width: 40%;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
