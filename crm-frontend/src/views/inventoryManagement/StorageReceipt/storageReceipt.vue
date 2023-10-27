<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-24 19:01:46
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-27 20:04:37
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\inventoryManagement\StorageReceipt\storageReceipt.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->
<template>
  <div class="container">
    <div class="app-container">
      <BaseDataList
        :useHeader="true"
        :title="sendData.title"
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
          <div class="wrap">
            <div class="wrap1">
              <!-- 刷新 -->
              <el-button
                @click="refresh"
                type="info"
                circle
                style="margin-right: 28px"
              >
                <el-button>
                  <el-icon>
                    <Refresh />
                  </el-icon>
                  刷新
                </el-button>
              </el-button>
              <!-- 批量导出 -->
              <BulkOPe
                :excelData="excel"
                tableName="入库表"
                excelName="入库表格.xlsx"
                :getOpt="() => [0, 1, 2]"
              >
                <template #excel> </template>
                <template #file> </template>
                <template #print> </template>
              </BulkOPe>
            </div>
            <div class="wrap2">
              <!-- 下拉选择框 -->
              <ChooseSelect
                placeholder="请输入商品名称或者SKU名称"
                :options="options"
              >
              </ChooseSelect>
              <el-button
                type="primary"
                :icon="Search"
                style="margin-left: 10px; padding-left: 10px"
              >
                搜索
              </el-button>
            </div>
            <el-button @click="getRows">获取被勾选的行</el-button>
            <!-- <el-button @click="changeLoadAnimation">加载动画></el-button> -->
          </div>
        </template>
      </BaseDataList>
    </div>
  </div>
</template>

<script setup>
import { Refresh, Search } from '@element-plus/icons-vue'
import BulkOPe from '@/components/BulkOpe/BulkOpe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'
//分页参数：
//pageIndex & pageSize
// 获取被勾选的行的数据（组件暴露出来的rows）
const getRows = () => {
  console.log('rows', baseDataListRef.value.rows)
  return baseDataListRef.value.rows
}

const sendData = {
  tableColumnAttribute: [
    {
      prop: 'id',
      label: '对应单号',
      sortable: true
    },
    {
      prop: 'que',
      label: '仓库',
      sortable: true
    },
    {
      // prop: 'create_user/create_time',
      prop: 'create_user_time',
      label: '创建人/时间'
    },
    {
      prop: 'data',
      label: '状态',
      useTag: true
    },
    {
      prop: 'number',
      label: '入库数量'
    },
    {
      // prop: 'into_user/into_time',
      prop: 'into_time_user',
      label: '入库(人员)/时间'
    },
    {
      prop: 'into_type',
      label: '入库类型'
    },
    {
      prop: 'intro',
      label: '备注'
    }
  ],
  tableData: [
    {
      id: '天河一期',
      que: '仓库123456',
      create_user_time: '张三/2022-10-10',
      //后端字段为status，后续拿到接口再处理一下
      data: { value: '已入库', tagType: 'success' },
      number: '100',
      into_time_user: '李四/2022-10-10',
      into_type: '采购入库',
      intro: '备注'
    },
    {
      id: '天河2期',
      que: '仓库123456',
      create_user_time: '张三/2022-10-10',
      //后端字段为status，后续拿到接口再处理一下
      data: { value: '已入库', tagType: 'success' },
      number: '100',
      into_time_user: '李四/2022-10-10',
      into_type: '采购入库',
      intro: '备注'
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
  total: 100,
  title: '入库单'
}

const baseDataListRef = ref(null)
//分页器组件点击调用get
const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}

// // 关闭表格加载动画
// const changeLoadAnimation = () => {
//   baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
// }
</script>

<style scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 20px;
}
</style>
