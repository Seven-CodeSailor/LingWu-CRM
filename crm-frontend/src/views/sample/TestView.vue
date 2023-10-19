<template>
  <div style="color: red">测试BaseDataList组件</div>
  <!-- 测试 -->
  <BaseDataList
    :title="sendData.title"
    :msg="sendData.msg"
    :table-column-attribute="sendData.tableColumnAttribute"
    :use-dropdown-menu="sendData.useDropdownMenu"
    :handle-delete="sendData.handleDelete"
    :handle-edit="sendData.handleEdit"
    :table-data="sendData.tableData"
    :dropdown-menu-actions-info="sendData.dropdownMenuActionsInfo"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    @update-table-data="get"
    ref="baseDataListRef"
  >
    <template #menu>
      <div>插槽区 <el-button @click="getRows">获取被勾选的列</el-button></div>
    </template>
  </BaseDataList>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import { ref } from 'vue'

// 测试数据传递

const sendData = {
  msg: '一些操作说明',
  tableColumnAttribute: [
    {
      prop: 'sex',
      label: '性别',
      // 是否使用排序
      sortable: true
    },
    {
      prop: 'age',
      label: '年龄',
      sortable: true
    },
    {
      prop: 'hoby',
      label: '爱好'
    },
    {
      prop: 'myPic',
      label: '带图片的列',
      // 该列数据是否使用了图片
      usePic: true
    }
  ],
  tableData: [
    {
      sex: '男',
      age: 19,
      hoby: '唱歌'
    },
    {
      sex: '女',
      age: 21,
      hoby: 'rap'
    },
    {
      sex: '男',
      age: 22,
      hoby: '篮球'
    }
  ],
  useDropdownMenu: true,
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 下拉菜单
  // 更改command  handleAtion  actionName的属性值
  dropdownMenuActionsInfo: [
    {
      command: 'delete',
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
    },
    {
      command: 'add',
      handleAction: (row) => {
        console.log('添加的回调函数', row)
      },
      actionName: '添加'
    }
  ],
  pageSizes: [2, 10, 15, 200],
  total: 100
}
const baseDataListRef = ref(null)
const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}
const getRows = () => {
  // 获取组件暴露出来的rows
  console.log('rows', baseDataListRef.value.rows)
}
</script>

<style lang="scss" scoped></style>
