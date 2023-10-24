<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-24 19:01:46
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-24 21:10:27
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\inventoryManagement\StorageReceipt\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->
<template>
  <div class="container">
    <div class="app-container">
      <BaseDataList
        :useHeader="true"
        :msg="sendData.msg"
        :table-column-attribute="sendData.tableColumnAttribute"
        :handle-delete="sendData.handleDelete"
        :table-data="sendData.tableData"
        :page-sizes="sendData.pageSizes"
        :total="sendData.total"
        :usePagination="true"
        :useDropdownMenu="true"
        :dropdownMenuActionsInfo="sendData.dropdownMenuActionsInfo"
        @update-table-data="get"
        ref="baseDataListRef"
      >
        <!-- 插槽区 -->
        <template #menu>
          <div>
            插槽区
            <el-button>搜索</el-button>
            <el-button>刷新</el-button>
            <el-button>批量操作-后续换成组件</el-button>
            <el-button @click="getRows">获取被勾选的列</el-button>
            <el-button @click="changeLoadAnimation">加载动画></el-button>
          </div>
        </template>
      </BaseDataList>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sendData = {
  tableColumnAttribute: [
    {
      prop: 'danhao',
      label: '对应单号',
      sortable: true
    },
    {
      prop: 'cangku',
      label: '仓库',
      sortable: true
    },
    {
      prop: 'chuangjianren',
      label: '创建人/时间'
    },
    {
      prop: 'state',
      label: '状态'
    },
    {
      prop: 'shuliang',
      label: '入库数量'
    },
    {
      prop: 'renyuan',
      label: '入库人员/时间'
    },
    {
      prop: 'leixing',
      label: '入库类型'
    },
    {
      prop: 'beizhu',
      label: '备注'
    }
  ],
  tableData: [
    {
      danhao: '天河一期',
      cangku: '仓库123456',
      chuangjianren: '张三/2022-10-10',
      state: '已入库',
      shuliang: '100',
      renyuan: '李四/2022-10-10',
      leixing: '采购入库'
    },
    {
      danhao: '天河2期',
      cangku: '仓库123456',
      chuangjianren: '张三/2022-10-10',
      state: '已入库',
      shuliang: '100',
      renyuan: '李四/2022-10-10',
      leixing: '采购入库'
    }
  ],
  msg: '操作说明',
  dropdownMenuActionsInfo: [
    {
      command: '查看',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('带着row的数据，拿id发请求拿到入库单明细', row)
      },
      actionName: '查看'
    },
    {
      command: '添加',
      // row为当前行的数据
      handleAction: (row) => {
        console.log(
          'row.id发起添加请求，dialog弹出？然后dialog里submit的时候确认入库？',
          row
        )
      },
      actionName: '添加'
    },
    {
      command: '删除',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('删除', row)
      },
      actionName: '删除'
    }
  ],
  // 传入删除操作的函数就会显示删除按钮
  handleDelete: (row) => {
    console.log('删除', row)
  },
  pageSizes: [2, 10, 15, 200],
  total: 100
}
const baseDataListRef = ref(null)
//分页器组件点击调用get
const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}

//获取被勾选的行的数据（组件暴露出来的rows）
const getRows = () => {
  console.log('rows', baseDataListRef.value.rows)
}
// 关闭表格加载动画
const changeLoadAnimation = () => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}
</script>

<style scoped></style>
