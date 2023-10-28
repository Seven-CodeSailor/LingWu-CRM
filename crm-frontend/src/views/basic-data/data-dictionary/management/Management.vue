<template>
  <div class="management">
    <BaseDataList
      title="字典管理"
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
            <el-button type="primary">添加数据</el-button>
            <el-button type="danger">批量删除</el-button>
          </div>
          <div class="right">
            <ChooseSelect
              des="请选择字典分类"
              :options="options"
              @update:cid="test"
            ></ChooseSelect>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ChooseSelect from '@/components//ChooseSelect/ChooseSelect.vue'
const baseDataListRef = ref(null)
const tableColumnAttribute = ref([
  {
    prop: 'numberId',
    label: '编号'
  },
  {
    prop: 'name',
    label: '字典名称'
  },
  {
    prop: 'typeName',
    label: '分类名称'
  },
  {
    prop: 'typeTag',
    label: '调用标识'
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

const tableData = ref([
  {
    numberId: '123',
    name: '小黑子',
    typeName: 'cxk',
    typeTag: '鸡',
    visible: true,
    sort: 99
  },
  {
    numberId: '123',
    name: '小黑子',
    typeName: 'cxk',
    typeTag: '鸡',
    visible: true,
    sort: 99
  },
  {
    numberId: '123',
    name: '小黑子',
    typeName: 'cxk',
    typeTag: '鸡',
    visible: false,
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
      console.log('修改的回调函数', row)
    },
    actionName: '修改'
  }
]

const inputValue = ref('')

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

const test = (v) => {
  console.log('v', v)
}

const options = ref([
  {
    value: 'Option1',
    label: '选项1'
  },
  {
    value: 'Option2',
    label: '选项2'
  },
  {
    value: 'Option2',
    label: '选项3'
  }
])
</script>

<style lang="scss" scoped>
.management {
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
