<!--
 * @Author: seven
 * @Date: 2023-10-24 16:13:53 
 * @Last Modified by:   seven 
 * @Last Modified time: 2023-10-24 16:13:53 
  -->

<template>
  <!-- 测试 -->
  <BaseDataList
    class="card"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    @update-table-data="get"
    ref="baseDataListRef"
  >
    <template #menu>
      <!-- 表格上面一行 -->
      <div>
        <el-button id="refresh">刷新</el-button>
        <!-- 下拉选择框 -->
        <BulkOPe :excelData="excel" :getOpt="() => [0, 1, 2]">
          <template #excel>
            <div>
              下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect>
            </div>
          </template>
        </BulkOPe>
        <el-button id="getCol" @click="getRows">获取被勾选的列</el-button>
        <el-button @click="changeLoadAnimation"
          >off或者open表格加载动画></el-button
        >
        <el-button id="search">搜索</el-button>
      </div>
    </template>
  </BaseDataList>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'

// 数据传递
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'SKUID',
      label: '商品编号/SKUID',
      sortable: false
    },
    {
      prop: 'SKUname',
      label: '商品名称或SKU名称',
      sortable: true
    },
    {
      prop: 'number',
      label: '数量'
    },
    {
      prop: 'type',
      label: '商品类型'
    },
    {
      prop: 'storageType',
      label: '仓库名称'
    },
    {
      prop: 'outOfStockList',
      label: '对应出库单'
    },
    {
      prop: 'outTime',
      label: '出库时间'
    },
    {
      prop: 'remark',
      label: '备注'
    }
  ],
  tableData: [
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    },
    {
      SKUID: '31231231',
      SKUname: 'hello',
      supplierName: '北京',
      number: 10,
      contactAdd: '123123123',
      type: '日常',
      storageType: '这是个仓库',
      outOfStockList: '出库单',
      outTime: '2021-05-23'
    }
  ],
  // 传入删除操作的函数就会显示删除按钮
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 分页数组
  pageSizes: [5, 10, 15],
  total: 100
}
const baseDataListRef = ref(null)
//分页器组件点击调用get
const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}

const getRows = () => {
  // 获取组件暴露出来的rows
  console.log('rows', baseDataListRef.value.rows)
}
const changeLoadAnimation = () => {
  // 关闭表格加载动画
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}

const excel = () => {
  // console.log('s', baseDataListRef.value.rows)
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
}

#search {
  display: flex;
  margin-left: auto;
  margin-right: 0;
}
#refresh {
  margin-right: 10px;
}
#getCol {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
