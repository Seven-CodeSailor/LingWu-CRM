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
      :useSelectColumn="false"
      @update-table-data="updateTableData"
      @update-switch-state="updateSwitchState"
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
      :handle-submit="handleSubmit"
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
const rowId = ref('')
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
const modifyTableData = async (params) => {
  return await regionalStore.modifyAreaItem(params)
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确认要删除吗?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await ElMessage({
        type: 'success',
        message: '删除完成'
      })
      await deleteTableData({ id: row.id })
        .then(async (res) => {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          await getTableData({
            pageSize: baseDataListRef.value.paginationData.pageSize,
            pageIndex: baseDataListRef.value.paginationData.currentPage
          })
        })
        .catch((err) => {
          console.log('error', err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}
const handleEdit = (row) => {
  const { name, intro, sort, visible, id } = row
  rowId.value = id
  regionalFormRef.value.visible = true
  // treeData的数据回显
  const data = findObjectById(regionalStore.areaTreeData, id)
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

const updateTableData = (pageSize, pageIndex) => {
  if (inputValue.value) {
    getTableData({
      pageSize,
      pageIndex,
      queryCondition: inputValue.value
    })
  } else {
    getTableData({
      pageSize,
      pageIndex
    })
  }
}

const updateSwitchState = async (state, row) => {
  baseDataListRef.value.openSwitchLoading =
    !baseDataListRef.value.openSwitchLoading

  await modifyTableData({ id: row.id, visible: state ? 1 : 0 }).then(
    async (res) => {
      ElMessage({
        message: res.message,
        type: 'success'
      })
      if (inputValue.value) {
        await regionalStore.getListAreaItem({
          pageIndex: baseDataListRef.value.paginationData.currentPage,
          pageSize: baseDataListRef.value.paginationData.pageSize,
          queryCondition: inputValue.value
        })
      } else {
        await regionalStore.getListAreaItem({
          pageIndex: baseDataListRef.value.paginationData.currentPage,
          pageSize: baseDataListRef.value.paginationData.pageSize
        })
      }

      baseDataListRef.value.openSwitchLoading =
        !baseDataListRef.value.openSwitchLoading
    }
  )
}

const addTableData = async (params) => {
  return await regionalStore.insertAreaItem(params)
}
const inputValue = ref('')
const handleSearch = async () => {
  if (!inputValue.value) {
    ElMessage.error('输入不能为空')
  } else {
    // 执行搜索后初始化分页数据
    baseDataListRef.value.paginationData.pageSize = 5
    baseDataListRef.value.paginationData.currentPage = 1
    await getTableData({
      pageSize: 5,
      pageIndex: 1,
      queryCondition: inputValue.value
    })
  }
}
const handleAdd = () => {
  title.value = '添加'
  regionalFormRef.value.visible = true
}
const handleSubmit = async () => {
  regionalFormRef.value.formRef.validate(async (vaild) => {
    if (vaild) {
      const { intro, name, selectValue, sort, visible } =
        regionalFormRef.value.form
      if (title.value === '修改') {
        await modifyTableData({
          intro,
          name,
          sort,
          visible: visible ? 1 : 0,
          parentId: Math.ceil(Math.random() * 1000),
          id: rowId.value
        })
          .then((res) => {
            ElMessage({
              message: res.message,
              type: 'success'
            })
          })
          .catch((err) => {
            ElMessage.error(err.data.message)
          })
      } else {
        // parentId问题待处理
        await addTableData({
          intro,
          name,
          sort,
          visible: visible ? 1 : 0,
          parentId: Math.ceil(Math.random() * 1000)
        }).then((res) => {
          ElMessage({
            message: res.message,
            type: 'success'
          })
        })
      }
      regionalFormRef.value.form = {
        name: '',
        sort: 0,
        visible: false,
        intro: '',
        selectValue: ''
      }
      regionalFormRef.value.visible = false
      await getTableData({
        pageIndex: baseDataListRef.value.paginationData.currentPage,
        pageSize: baseDataListRef.value.paginationData.pageSize
      })
    }
  })
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
