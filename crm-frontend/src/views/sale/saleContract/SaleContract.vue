<!--
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-10-26 21:58:11
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-10-28 21:28:44
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\sale\saleContract\SaleContract.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <BaseDataList
    class="card"
    :title="sendData.title"
    :msg="sendData.opreateTip"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    useDropdownMenu="true"
    :dropdownMenuActionsInfo="sendData.dropdownMenuActionsInfo"
    useOperateColumn="true"
    @update-table-data="get"
    ref="baseDataListRef"
  >
    <template #menu>
      <!-- 表格上面一行 -->
      <div class="menu">
        <div class="left">
          <el-button type="primary" :icon="Plus" style="margin: 0"
            >添加数据</el-button
          >
          <el-button @click="changeLoadAnimation" class="refresh"
            >刷新</el-button
          >
          <!-- 下拉选择框 -->
          <BulkOPe :excelData="getRows" :getOpt="() => [0, 2, 3, 4]">
            <template #excel>
              <div>
                下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect>
              </div>
            </template>
          </BulkOPe>
          <el-button @click="deleteData" type="waring" color="#FF3800"
            >删除所选</el-button
          >
          <el-button type="success" :icon="Files" style="margin: 0"
            >单文件上传</el-button
          >
        </div>
        <div class="right">
          <el-input
            v-model="inputValue"
            placeholder="输入搜索内容"
            style="margin-right: 4px"
          />
          <DropDown
            :getDropDown="() => [0, 1, 2, 3]"
            v-model:topInputValue="topInputValue"
            v-model:bottomInputValue="bottomInputValue"
            inputTitle1="销售合同ID"
            inputTitle2="合同详情"
            inputTitle3="合同清单"
            @handle-search="handleSearch"
          ></DropDown>
          <el-button
            type="primary"
            style="margin-left: 4px"
            @click="searchDetails"
          >
            <el-icon style="margin-right: 4px"><icon-search /></el-icon>搜索
          </el-button>
        </div>
      </div>
    </template>
    <!-- 插槽显示图标 -->
    <template #ico>
      <el-icon><SoldOut /></el-icon>
    </template>
  </BaseDataList>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { SoldOut, Plus, Files } from '@element-plus/icons-vue'

const inputValue = ref('')

// 删除操作
const deleteData = () => {
  ElMessageBox.confirm('该操作将会删除所勾选列的所有数据，是否确认？', '注意', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消！'
      })
    })
}
// 数据传递
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'contract_id',
      label: '销售合同ID',
      sortable: false
    },
    {
      prop: 'title',
      label: '订单主题',
      sortable: false
    },
    {
      prop: 'name',
      label: '客户名称'
    },
    {
      prop: 'contract_no',
      label: '合同编号'
    },
    {
      prop: 'customer_id',
      label: '客户ID'
    },
    {
      prop: 'linkman_id',
      label: '联系人ID'
    },
    {
      prop: 'chance_id',
      label: '销售机会ID'
    },
    {
      prop: 'website_id',
      label: '关联网站'
    },
    {
      prop: 'start_date',
      label: '开始时间'
    },
    {
      prop: 'end_date',
      label: '结束时间'
    },
    {
      prop: 'our_user_id',
      label: '我方联系人'
    },
    {
      prop: 'money',
      label: '合同金额'
    },
    {
      prop: 'goods_money',
      label: '商品金额'
    },
    {
      prop: 'zero_money',
      label: '去零金额'
    },
    {
      prop: 'back_money',
      label: '回款金额'
    },
    {
      prop: 'owe_money',
      label: '欠款金额'
    },
    {
      prop: 'back_status',
      label: '回款状态'
    },
    {
      prop: 'deliver_money',
      label: '交付金额'
    },
    {
      prop: 'invoice_money',
      label: '开票金额'
    },
    {
      prop: 'invoice_status',
      label: '开票状态'
    },
    {
      prop: 'intro',
      label: '订单介绍'
    },
    {
      prop: 'deliver_status',
      label: '交付状态'
    },
    {
      prop: 'renew_status',
      label: '订单类型'
    },
    {
      prop: 'create_user_id',
      label: '创建者'
    },
    {
      prop: 'create_time',
      label: '创建时间'
    },
    {
      prop: 'content',
      label: '备注'
    }
  ],
  tableData: [
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    },
    {
      contract_id: 1223023,
      title: '英雄联盟',
      name: '腾讯',
      contract_no: '这是一个合同编号',
      customer_id: 892102,
      linkman_id: 123023,
      chance_id: 20332,
      website_id: 2302103,
      start_date: '2022-11-23',
      end_date: '2022-12-30',
      our_user_id: 523932,
      money: 200000,
      goods_money: 1200,
      zero_money: 2100,
      back_money: 2000,
      owe_money: 500,
      back_status: 1,
      deliver_money: 2300,
      invoice_money: 3200,
      invoice_status: 20,
      intro: '这是腾讯的订单',
      deliver_status: 23,
      renew_status: 12,
      create_user_id: 231232,
      create_time: '2022-12-21',
      content: '这是个备注'
    }
  ],
  title: '销售合同',
  opreateTip: '销售合同提示信息',
  dropdownMenuActionsInfo: [
    {
      command: '修改',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('带着row的数据，拿id发请求拿到入库单明细', row)
      },
      actionName: '修改'
    },
    // 操作列表的删除操作 还需完善
    {
      command: '删除',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('删除', row)
      },
      actionName: '删除'
    },
    // 操作列表的录入明细操作 还需完善
    {
      command: '录入明细',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('录入明细', row)
      },
      actionName: '录入明细'
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

// const excel = () => {
//   console.log('s', baseDataListRef.value.rows)
// }
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
}

button {
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
