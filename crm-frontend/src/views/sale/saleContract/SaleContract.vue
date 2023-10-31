<!--
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-10-26 21:58:11
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-10-30 20:59:19
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\sale\saleContract\SaleContract.vue
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
    @selection-change="selectChange"
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
                :disabled="selectArr ? false : true"
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
            :disabled="searchSaleName ? false : true"
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
    :title="saleContractData.title === '' ? '添加合同' : '修改合同'"
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
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { SoldOut, Plus } from '@element-plus/icons-vue'
// 搜索框的searchDetails方法还需完善

// 批量删除所选列表
let selectArr = ref([])
// table表勾选时触发的事件
const selectChange = (value) => {
  selectArr.value = value
}
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

// 点击保存按钮后的回调函数用来保存数据
const saveData = () => {
  saleContractData.value.contract_no = 0
  saleContractData.value.happen_date = ''
  saleContractData.value.end_date = ''
  saleContractData.value.money = 0
  saleContractData.value.intro = ''
  dialogVisible.value = false
  // 这里还需要对表单数据进行判断的 还需完善
  ElMessage.success('添加成功')
}

// 搜索的销售合同主题名称
const searchContractName = ref('')

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
      prop: `回款: back_money \n 去零: zero_money \n 欠款: owe_money \n back_status`,
      // ['back_money','zero_money','owe_money','back_status'],
      label: '回款/金额/状态',
      sortable: true
    },
    {
      prop: ['deliver_money', 'invoice_money', 'invoice_status'],
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
      label: '合同状态'
    },
    {
      prop: 'deliver_status',
      label: '交付状态'
    }
  ],
  tableData: [
    {
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      back_money: 20000,
      zero_money: 0,
      owe_money: 12000,
      back_status: '未付',
      deliver_money: 8000,
      invoice_money: 1000,
      invoive_status: '需要',
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: '临时单',
      deliver_status: '需要'
    },
    {
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      back_money: 20000,
      zero_money: 0,
      owe_money: 12000,
      back_status: '未付',
      deliver_money: 8000,
      invoice_money: 1000,
      invoive_status: '需要',
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: '临时单',
      deliver_status: '需要'
    },
    {
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      back_money: 20000,
      zero_money: 0,
      owe_money: 12000,
      back_status: '未付',
      deliver_money: 8000,
      invoice_money: 1000,
      invoive_status: '需要',
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: '临时单',
      deliver_status: '需要'
    },
    {
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      back_money: 20000,
      zero_money: 0,
      owe_money: 12000,
      back_status: '未付',
      deliver_money: 8000,
      invoice_money: 1000,
      invoive_status: '需要',
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: '临时单',
      deliver_status: '需要'
    },
    {
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      back_money: 20000,
      zero_money: 0,
      owe_money: 12000,
      back_status: '未付',
      deliver_money: 8000,
      invoice_money: 1000,
      invoive_status: '需要',
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: '临时单',
      deliver_status: '需要'
    },
    {
      title: '任天堂游戏公司',
      customer_id: '任天堂',
      money: 23000,
      back_money: 20000,
      zero_money: 0,
      owe_money: 12000,
      back_status: '未付',
      deliver_money: 8000,
      invoice_money: 1000,
      invoive_status: '需要',
      start_date: '2021-10-21',
      end_date: '2021-10-31',
      status: '临时单',
      deliver_status: '需要'
    }
  ],
  title: '销售合同',
  opreateTip: '多一眼看一眼就会爆炸',
  dropdownMenuActionsInfo: [
    {
      command: '修改',
      // row为当前行的数据
      handleAction: (row) => {
        dialogVisible.value = 'ture'
        console.log('带着row的数据,拿id发请求拿到入库单明细', row)
      },
      actionName: '修改'
    },

    // 操作列表的删除操作 还需完善
    {
      command: '删除',
      // row为当前行的数据
      handleAction: (row) => {
        alert('确认删除吗')
        console.log('带着row的数据,拿id发请求拿到入库单明细', row)
      },
      actionName: '删除'
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

// 处理请求提交的方法 修改数据
const handleCommand = (command, row) => {
  const item = sendData.dropdownMenuActionsInfo.find((item) => {
    return item.command === command
  })
  item.handleAction(row)
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
</style>
