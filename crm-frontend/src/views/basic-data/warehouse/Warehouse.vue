<template>
  <div class="warehouse">
    <BaseDataList
      title="仓库管理"
      :table-data="tableData"
      :table-column-attribute="tableColumnAttribute"
      :use-dropdown-menu="true"
      :dropdown-menu-actions-info="dropdownMenuActionsInfo"
      :page-sizes="[5, 10, 15]"
      :total="999"
      @update-table-data="get"
      @update-switch-state="get1"
      ref="baseDataListRef"
    >
      <template #ico>
        <el-icon><icon-message-box /></el-icon
      ></template>
      <template #menu>
        <div class="content">
          <div class="left">
            <el-button type="primary" @click="addWarehouse">添加数据</el-button>
            <el-button type="danger">批量删除</el-button>
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="请输入搜索名称"
              style="margin: 0 4px; width: 200px"
            />
            <el-button type="primary" style="margin-left: 4px">
              <el-icon style="margin-right: 4px"><icon-search /></el-icon
              >搜索</el-button
            >
          </div>
        </div>
      </template></BaseDataList
    >
    <WarehouseFrom
      ref="warehouseFromRef"
      :title="title"
      :handle-submit="submit"
    ></WarehouseFrom>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import WarehouseFrom from './WarehouseFrom.vue'
const baseDataListRef = ref(null)
const warehouseFromRef = ref(null)
const tableColumnAttribute = ref([
  {
    prop: 'name',
    label: '仓库名称'
  },
  {
    prop: 'managePerson',
    label: '仓库管理人员'
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
])
const title = ref('')
const tableData = ref([
  {
    name: '小黑子',
    managePerson: 'cxk',
    visible: true,
    sort: 99
  },
  {
    name: '小黑子',
    managePerson: 'cxk',
    visible: true,
    sort: 99
  },
  {
    name: '小黑子',
    managePerson: 'cxk',
    visible: true,
    sort: 99
  }
])

const dropdownMenuActionsInfo = [
  {
    command: 'delete',
    // row为当前行的数据
    handleAction: (row) => {
      console.log('删除的回调函数', row)
    },
    actionName: '删除'
  },
  {
    command: 'edit',
    handleAction: (row) => {
      warehouseFromRef.value.visible = true
      title.value = '修改'
      console.log('修改的回调函数', row)
      warehouseFromRef.value.form = { ...row }
    },
    actionName: '修改'
  }
]

const addWarehouse = () => {
  title.value = '添加'
  warehouseFromRef.value.visible = true
}

const inputValue = ref('')

const submit = () => {
  warehouseFromRef.value.form = {
    name: '',
    visible: true,
    sort: 0,
    intro: ''
  }
  warehouseFromRef.value.visible = false
}

const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}
const get1 = (state, row) => {
  console.log('调用后端的接口发请求修改开关的state后才能真正改变开关的状态')
  console.log('开关的状态已被修改，为：', state)
  console.log('当前行的数据', row)
  // 开启loading
  baseDataListRef.value.openSwitchLoading =
    !baseDataListRef.value.openSwitchLoading
  // 关闭loading  模拟异步请求
  setTimeout(() => {
    baseDataListRef.value.openSwitchLoading =
      !baseDataListRef.value.openSwitchLoading
  }, 1000)
}
</script>

<style lang="scss" scoped>
.warehouse {
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
:deep(.el-select .el-input__wrapper) {
  height: 32px;
}
</style>
