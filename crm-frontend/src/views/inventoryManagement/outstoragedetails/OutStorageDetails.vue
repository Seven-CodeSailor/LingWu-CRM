<!--
 * @Author: seven
 * @Date: 2023-10-24 16:13:53 
 * @Last Modified by:   seven 
 * @Last Modified time: 2023-10-24 16:13:53 
  -->

<template>
  <BaseDataList
    class="card"
    :title="headTitle"
    :msg="msg"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    :useDropdownMenu="isUseDropdownMenu"
    :dropdownMenuActionsInfo="dropdownMenuActionsInfo"
    :useOperateColumn="useOperateColumn"
    @update-table-data="get"
    ref="baseDataListRef"
  >
    <template #menu>
      <!-- 表格上面一行 -->
      <div class="menu">
        <div class="left">
          <el-button @click="changeLoadAnimation" class="refresh"
            >刷新</el-button
          >
          <!-- 下拉选择框 -->
          <BulkOPe :excelData="getRows" :getOpt="() => [0, 1, 2]">
            <template #excel>
              <div>
                下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect>
              </div>
            </template>
          </BulkOPe>
        </div>
        <div class="right">
          <el-input
            v-model="inputValue"
            placeholder="输入商品名称或者SKU名称"
            style="margin-right: 4px"
          />
          <DropDown
            v-model:topInputValue="topInputValue"
            v-model:bottomInputValue="bottomInputValue"
            topInputTitle="供应商名称"
            bottomInputTitle="通信地址"
            @handle-search="handleSearch"
          ></DropDown>
          <el-button
            type="primary"
            style="margin-left: 4px"
            @click="searchDetails"
          >
            <el-icon style="margin-right: 4px"><icon-search /></el-icon
            >搜索</el-button
          >
        </div>
      </div>
    </template>
  </BaseDataList>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { reactive, ref } from 'vue'
import DropDown from '../../../components/DropDown/DropDown.vue'

// 表头设置
const headTitle = reactive('出库明细')
// 操作说明提示
const msg = reactive('多一眼看一眼就会爆炸')
//使用下拉菜单
const isUseDropdownMenu = true
// 不显示操作列
const useOperateColumn = false
const dropdownMenuActionsInfo = () => {
  return [
    {
      command: '操作1',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('操作1回调函数', row)
      },
      actionName: '操作1的名称'
    },
    {
      command: '操作2',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('操作2回调函数', row)
      },
      actionName: '操作2的名称'
    },
    {
      command: '操作3',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('操作3回调函数', row)
      },
      actionName: '操作3的名称'
    }
  ]
}

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

const baseDataListRef = ref()
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
  setTimeout(() => {
    baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  }, 500)
}

const excel = () => {
  // console.log('s', baseDataListRef.value.rows)
}
</script>

<style lang="scss" scoped>
.card {
  margin-top: 0;
  width: 100%;
  height: 100%;
}

button {
  margin-top: 0%;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  .left {
    height: 40px;
  }
  .right {
    height: 40px;
    display: flex;
    align-items: center;
  }
}

#getCol {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
