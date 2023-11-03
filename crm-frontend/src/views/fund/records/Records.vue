<template>
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">账户流水记录</div>
      </h3>
      <el-button
        class="button"
        @click="operatingInstructionDialogVisible = true"
      >
        <el-icon style="margin-right: 4px"> <icon-question /></el-icon
        >操作说明</el-button
      >
    </header>
    <!-- 操作搜索栏 -->
    <section class="menu">
      <div class="left">
        <BulkOPe :getOpt="() => [0]" :exportFile="exportFile()"> </BulkOPe>
      </div>
      <div class="right" style="display: flex">
        <el-input
          v-model="content"
          placeholder="输入银行账户ID"
          style="margin-right: 4px; width: 200px"
        />
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails"
          :disabled="content ? false : true"
          icon="IconSearch"
        >
          搜索
        </el-button>
      </div>
    </section>
    <!-- 表格部分 -->
    <el-table
      style="width: 100%; margin-bottom: 20px"
      table-layout="auto"
      :data="records.tableData"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="银行账号" prop="bankId"></el-table-column>
      <el-table-column label="收入" prop="income" sortable>
        <template #default="{ row }">
          {{ '+' + row.income.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="支出" prop="expenditrue" sortable>
        <template #default="{ row }">
          {{ '-' + row.expenditrue.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="余额" prop="surplus" sortable>
        <template #default="{ row }">
          {{ row.surplus.toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="支出类型" prop="type">
        <template #default="{ row }">
          <el-tag :type="row.type === '2' ? 'success' : 'info'">{{
            row.type
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="关联单号" prop="connectId"></el-table-column>
      <el-table-column label="创建人" prop="createUser"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>
    <section>
      支出金额合计：¥<span style="color: red">
        {{ records.totalExpenditure.toFixed(2) }}
      </span>
      收入金额合计：¥<span style="color: red">
        {{ records.totalIncome.toFixed(2) }}
      </span>
    </section>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="records.tableData.length"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import useSelect from '@/stores/customer/select.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
// import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import useRecords from '@/stores/fund/records/records.js'
import {
  queryFlowredords,
  exportFlowrecords
} from '@/apis/fund/recoreds/index.js'

const records = useRecords()

// 初始化数据
const initRecords = async (currentPage, pageSize, bankId) => {
  await queryFlowredords(currentPage, pageSize, bankId)
}
onMounted(() => {
  initRecords(currentPage, pageSize)
})
// 当前页数
const currentPage = ref(1)
// 每页数据
const pageSize = ref(5)
const handleSizeChange = (val) => {
  pageSize.value = val
  initRecords(currentPage, pageSize)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initRecords(currentPage, pageSize)
}

/**
 * 批量导出
 */
// 存储批量导出的客户的id
let selectIdArr = ref([])
// table复选框勾选时触发的事件
const selectChange = (value) => {
  selectIdArr.value = value
}
// 导出文件按钮回调
const exportFile = async () => {
  await exportFlowrecords(selectIdArr)
}

/**
 * 搜索
 */
let content = ref('')
const searchDetails = () => {
  initRecords(currentPage, pageSize, content)
  content.value = ''
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
