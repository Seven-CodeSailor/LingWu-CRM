<!--
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-10-26 21:58:11
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-10-31 12:55:00
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\sale\saleContract\SaleContract.vue
-->

<template>
  <BaseDataList
    class="card"
    :title="sendData.title"
    :msg="sendData.msg"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    useDropdownMenu="true"
    :dropdownMenuActionsInfo="sendData.dropdownMenuActionsInfo"
    useOperateColumn="true"
    :paginationData="paginationData"
    useCalculate="true"
    @update-table-data="get"
    ref="baseDataListRef"
    @selection-change="handleSelectionChange"
    @command="(command) => handleCommand(command, row)"
  >
    <template #menu>
      <!-- 表格上面一行 -->
      <div class="menu">
        <div class="left">
          <el-button
            type="primary"
            :icon="Plus"
            style="margin: 0; width: 90px"
            @click="addData"
            >添加数据</el-button
          >
          <el-button @click="changeLoadAnimation">刷新</el-button>
          <!-- 下拉选择框 -->
          <BulkOPe :excelData="getRows" :getOpt="() => [0, 2, 3, 4]">
            <template #excel>
              <div>
                下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect>
              </div>
            </template>
          </BulkOPe>
          <!-- <el-button :disabled="selectArr.length ? false: true" @click="deleteData" type="waring" color="#FF3800"
            >批量删除</el-button
          > -->
          <el-popconfirm
            :title="`你确定要删除这些选择的客户吗?`"
            width="240px"
            @confirm="deleteByQuery"
          >
            <template #reference>
              <el-button
                type="danger"
                icon="IconDelete"
                style="margin-right: 10px"
                :disabled="isDisabled"
                >批量删除</el-button
              >
            </template>
          </el-popconfirm>
        </div>
        <div class="right">
          <ChooseSelect
            style="margin-right: 5px; width: 130px"
            des="有效期起始"
            :options="options"
          ></ChooseSelect>
          <ChooseSelect
            style="margin-right: 5px; width: 130px"
            :options="options"
            des="有效期结束"
          ></ChooseSelect>
          <el-input
            v-model="searchContractName"
            placeholder="输入主题关键字搜索"
            style="margin-right: 4px; width: 180px"
          />
          <!-- 搜索功能还需完善 -->
          <DropDown
            :getDropDown="() => [0, 1, 3]"
            v-model:inputVal1="inputValue1"
            v-model:inputVal2="inputValue2"
            inputTitle1="客户名称"
            inputTitle2="备注内容"
            @handle-search="handleSearch"
          ></DropDown>
          <el-button
            type="primary"
            style="margin-left: 4px"
            @click="changeLoadAnimation"
            :disabled="searchContractName ? false : true"
          >
            <el-icon style="margin-right: 4px"><icon-search /></el-icon>搜索
          </el-button>
        </div>
      </div>
    </template>
    <!-- 分页 -->
    <template>
      <el-pagination
        v-model:current-page="paginationData.currentPage"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="sendData.pageSizes"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="sendData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 30px"
      />
    </template>
    <!-- 插槽显示图标 -->
    <template #ico>
      <el-icon><SoldOut /></el-icon>
    </template>
  </BaseDataList>

  <!-- 添加或修改销售机会信息 -->
  <el-drawer
    v-model="dialogVisible"
    :title="saleContractData.id === '' ? '添加合同' : '修改合同'"
    size="50%"
  >
    <el-form
      :model="saleContractData"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="合同编号">
        <el-input
          v-model="saleContractData.contract_no"
          placeholder="输入合同编号"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="主题">
        <el-input
          v-model="saleContractData.title"
          placeholder="输入主题"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户销售机会">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户销售机会"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-date-picker
          v-model="saleContractData.start_date"
          type="datetime"
          placeholder="选择合同生效开始时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="预计签订日期">
        <el-date-picker
          v-model="saleContractData.end_date"
          type="datetime"
          placeholder="选择合同生效结束时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="合同金额">
        <el-input v-model="saleContractData.money" style="width: 500px" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="saleContractData.intro"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="我方代表">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选我方代表"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveData"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 录入明细的抽屉 -->
  <el-drawer v-model="dialogVisible1" title="录入明细" size="50%">
    <el-card style="width: 100%; height: 350px; margin-top: 0">
      <div class="drawer2">
        <h3>合同标题：123123</h3>
        <h3>合同金额： 20232</h3>
        <h3>合同编号：22104582123</h3>
      </div>
      <div class="table_details">
        <el-table :data="details_data" table-layout="auto">
          <el-table-column
            label="商品名称/商品规格"
            prop="nameOrType"
          ></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="数量" prop="numbers"></el-table-column>
          <el-table-column label="金额" prop="money"></el-table-column>
          <el-table-column label="备注" prop="info"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <!-- 删除明细列表的数据  deleteData方法还需完善 -->
            <el-button type="primary" size="small" @click="deleteData"
              >删除</el-button
            >
          </el-table-column>
        </el-table>
      </div>
      <hr style="margin-top: 20px" />
      <div class="info">
        <el-button type="primary" :icon="Plus">添加商品</el-button>
        <span>注意：只因你太美</span>
        <span>商品总金额：{{}}</span>
        <el-button type="primary" @click="saveDetailsData">保存数据</el-button>
      </div>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="saveData"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 详情界面 -->
  <el-drawer v-model="dialogVisible2" title="合同详细" icon="Home" size="70%">
    <ContractDetails
      :contract-money="item.contract_no"
      :zero-out-money="sendData.zeroOutMoney"
      :due-money="sendData.dueMoney"
      :start-date="sendData.startDate"
      :end-date="sendData.endDate"
      :create-date="sendData.startDate"
      :our-represent="sendData.ourRepresent"
      :contract-title="sendData.contractTitle"
      :contract-id="sendData.contractId"
      :tag-name="sendData.tagName"
      :tag-type="sendData.tagType"
      :first-table-data="sendData.firstTableData"
      :second-table-data="sendData.secondTableData"
      :third-table-data="sendData.thirdTableData"
      :fourth-table-data="sendData.fourthTableData"
      :purchaseContractUniqueField="sendData.purchaseContractUniqueField"
      :handle-add-attachment="sendData.handleAddAttachment"
    >
    </ContractDetails>
  </el-drawer>
</template>

<script setup>
import ContractDetails from '@/components/DataList/ContractDetails.vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { SoldOut, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 搜索框的searchDetails方法还需完善

// 批量删除所选列表
// let selectArr = ref([])
// // table表勾选时触发的事件
// const selectChange = (value) => {
//   selectArr.value = value
// }
// 删除成功的回调
const deleteByQuery = () => {
  ElMessage.success('删除成功')
}

// 最近联系时间的选项
const options = ref([
  {
    value: 'Option1',
    label: '最近三天'
  },
  {
    value: 'Option2',
    label: '最近一周'
  },
  {
    value: 'Option3',
    label: '最近半月'
  },
  {
    value: 'Option4',
    label: '最近一月'
  },
  {
    value: 'Option5',
    label: '最近三月'
  },
  {
    value: 'Option6',
    label: '最近六月'
  },
  {
    value: 'Option7',
    label: '最近一年'
  }
])
// 控制抽屉的显示与否
let dialogVisible = ref(false)

//添加销售机会
// 新增销售机会的数据
let saleContractData = ref({
  id: '',
  contract_no: 0,
  title: '',
  start_date: '',
  end_date: '',
  money: 0,
  intro: ''
})

// 添加或者修改后的重置数据
const resetData = ref({
  id: '',
  contract_no: 0,
  title: '',
  start_date: '',
  end_date: '',
  money: 0,
  intro: ''
})

// 添加按钮的回调函数
let addData = () => {
  dialogVisible.value = true
}

// 录入明细的抽屉显示控制
let dialogVisible1 = ref(false)

// 点击保存按钮后的回调函数用来保存数据
const saveData = () => {
  saleContractData.value.contract_no = 0
  saleContractData.value.happen_date = ''
  saleContractData.value.end_date = ''
  saleContractData.value.money = 0
  saleContractData.value.intro = ''
  dialogVisible.value = false
  // 这里还需要对表单数据进行判断的 还需完善
  if (saleContractData.value.id === '') {
    console.log('新增数据成功')
    ElMessage.success('添加成功')
  }
  // 还需完善
  ElMessage.success('修改成功')
  console.log('修改或者新增的合同数据：', saleContractData.value)
  saleContractData.value = resetData.value
}

// 搜索的销售合同主题名称
const searchContractName = ref('')
const back_money_status = {
  back_money: 1000,
  zero_money: 200,
  owe_money: 300,
  back_status: '未付'
}

const deliver_money_status = {
  deliver_money: 200,
  invoice_money: 1200,
  invoive_status: '需要'
}
const item = ref({})
// 数据传递
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'title',
      label: '合同主题',
      sortable: false
    },
    {
      prop: 'customer_id',
      label: '客户名称',
      sortable: true
    },
    {
      prop: 'money',
      label: '合同金额',
      sortable: true
    },
    {
      prop: 'back_money_status',
      label: '回款/金额/状态',
      sortable: true
    },
    {
      prop: 'deliver_money_status',
      label: '发票/金额/状态',
      sortable: true
    },
    {
      prop: 'start_date',
      label: '开始时间',
      sortable: true
    },
    {
      prop: 'end_date',
      label: '结束时间',
      sortable: true
    },
    {
      prop: 'status',
      label: '合同状态',
      // 是否使用标签功能
      useTag: true
    },
    {
      prop: 'deliver_status',
      label: '交付状态',
      // 是否使用标签功能
      useTag: true
    }
  ],
  tableData: [
    {
      contract_no: 210230203,
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: {
        value: '执行中',
        tagType: 'success'
      },
      deliver_status: {
        value: '需要',
        tagType: 'warning'
      },
      back_money_status: `回款：${back_money_status.back_money}\n去零： ${back_money_status.zero_money}\n欠款： ${back_money_status.owe_money}\n状态：${back_money_status.back_status}`,
      deliver_money_status: `开票： ${deliver_money_status.deliver_money}\n状态：${deliver_money_status.invoive_status}`
    },
    {
      contract_no: 210230203,
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      start_date: '2021-10-22',
      end_date: '2021-10-31',
      status: {
        value: '执行中',
        tagType: 'success'
      },
      deliver_status: {
        value: '无需交付',
        tagType: 'success'
      },
      back_money_status: `回款：${back_money_status.back_money}\n去零： ${back_money_status.zero_money}\n欠款： ${back_money_status.owe_money}\n状态：${back_money_status.back_status}`,
      deliver_money_status: `开票： ${deliver_money_status.deliver_money}\n状态：${deliver_money_status.invoive_status}`
    },
    {
      contract_no: 210230203,
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      start_date: '2021-10-24',
      end_date: '2021-10-31',
      status: {
        value: '临时单',
        tagType: 'warning'
      },
      deliver_status: {
        value: '需要',
        tagType: 'warning'
      },
      back_money_status: `回款：${back_money_status.back_money}\n去零： ${back_money_status.zero_money}\n欠款： ${back_money_status.owe_money}\n状态：${back_money_status.back_status}`,
      deliver_money_status: `开票： ${deliver_money_status.deliver_money}\n状态：${deliver_money_status.invoive_status}`
    },
    {
      contract_no: 210230203,
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      start_date: '2021-10-23',
      end_date: '2021-10-31',
      status: {
        value: '临时单',
        tagType: 'warning'
      },
      deliver_status: {
        value: '需要',
        tagType: 'warning'
      },
      back_money_status: `回款：${back_money_status.back_money}\n去零： ${back_money_status.zero_money}\n欠款： ${back_money_status.owe_money}\n状态：${back_money_status.back_status}`,
      deliver_money_status: `开票： ${deliver_money_status.deliver_money}\n状态：${deliver_money_status.invoive_status}`
    },
    {
      contract_no: 210230203,
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      start_date: '2021-10-20',
      end_date: '2021-10-31',
      status: {
        value: '执行中',
        tagType: 'success'
      },
      deliver_status: {
        value: '需要',
        tagType: 'warning'
      },
      back_money_status: `回款：${back_money_status.back_money}\n去零： ${back_money_status.zero_money}\n欠款： ${back_money_status.owe_money}\n状态：${back_money_status.back_status}`,
      deliver_money_status: `开票： ${deliver_money_status.deliver_money}\n状态：${deliver_money_status.invoive_status}`
    }
  ],
  title: '销售合同',

  // 操作提示的内容
  msg: '多一眼看一眼就会爆炸12313123我哈哈哈',
  dropdownMenuActionsInfo: [
    {
      command: 'update',
      // row为当前行的数据
      handleAction: (row) => {
        dialogVisible.value = 'ture'

        console.log('修改当前行的数据', row)
      },
      actionName: '修改'
    },

    // 操作列表的删除操作 还需完善
    {
      command: 'delete',
      // row为当前行的数据
      handleAction: (row) => {
        alert('确认删除吗')
        console.log('删除当前行数据', row)
      },
      actionName: '删除'
    },
    {
      command: 'details',
      handleAction: (row) => {
        dialogVisible1.value = 'false'
        console.log('录入明细', row)
      },
      actionName: '录入明细'
    },
    {
      command: 'showDetails',
      handleAction: (row) => {
        dialogVisible2.value = 'true'
        item.value = {
          ...row
        }
        console.log('1', item)
        console.log('详细界面')
      },
      actionName: '详细'
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

// 录入明细的抽屉里的数据
const details_data = [
  {
    nameOrType: '123',
    price: 2323,
    numbers: 123,
    money: 23032,
    info: '备注'
  }
]
// 处理录入明细里表格删除请求
const deleteData = (row) => {
  console.log('删除所选明细列表的数据', row)
}

// 处理录入明细抽屉的保存操作
const saveDetailsData = () => {
  ElMessage('保存录入明细成功')
}

// 处理详细的抽屉显示
let dialogVisible2 = ref(false)

// 处理请求提交的方法 修改数据
const handleCommand = (command, row) => {
  const item = sendData.dropdownMenuActionsInfo.find((item) => {
    return item.command === command
  })
  item.handleAction(row)
}

const baseDataListRef = ref()
//分页器组件点击调用get
const paginationData = ref({
  currentPage: 1,
  pageSize: sendData.pageSizes ? sendData.pageSizes[0] : 5
})

const getRows = () => {
  // 获取组件暴露出来的rows
  console.log('rows', baseDataListRef.value.rows)
}
// 处理选择的行是否发生变化
const handleSelectionChange = (newRows) => {
  baseDataListRef.value.rows = newRows
}
// 开启/关闭表格加载动画
const changeLoadAnimation = () => {
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
.main {
  width: 100%;
}

.card {
  width: 100%;
  height: 100%;
}

button {
  margin-left: 5px;
  margin-right: 5px;
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

.dialog-footer {
  display: flex;
  justify-content: space-around;
}

#getCol {
  margin-left: 10px;
  margin-right: 10px;
}
.drawer2 {
  display: flex;
  justify-content: space-between;
}
.title {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  margin-top: 10%;
  justify-content: space-around;
}

// 表格里的内容换行用
:deep(.el-table .cell) {
  white-space: pre-wrap;
}
</style>
