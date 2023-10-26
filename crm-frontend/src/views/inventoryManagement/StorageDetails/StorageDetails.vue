<script setup>
import {
  House,
  Search,
  QuestionFilled,
  ArrowDown
} from '@element-plus/icons-vue'
import Table from '@/components/table/Table.vue'
import BulkOPe from '@/components/BulkOpe/BulkOpe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { getInventortOutTableList } from '@/apis/inventory-manager/index.js'
// import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
// 控制表格是否加载
const loading = ref(false)
// 控制操作说明显示隐藏的数据
const helpPop = ref(false)
// const update = () => {
//   loading.value = true
//   setTimeout(() => {
//     loading.value = false
//   }, 500)
// }
// 表格数据
const tableData = ref([
  {
    对应单号: '天河项目单号',
    仓库: '一号仓库12456',
    商品类型: '男装',
    仓库名称: '01仓库',
    时间: '2021-06-02 17:58:32',
    状态: '已出库',
    出库数量: 2,
    出库人员时间: '2021-06-02 17:58:45',
    出库类型: '销售出库',
    备注: ''
  },
  {
    对应单号: '天河项目单号',
    仓库: '一号仓库12456',
    商品类型: '男装',
    仓库名称: '01仓库',
    时间: '2021-06-02 17:58:32',
    状态: '已出库',
    出库数量: 2,
    出库人员时间: '2021-06-02 17:58:45',
    出库类型: '销售出库',
    备注: ''
  },
  {
    对应单号: '天河项目单号',
    仓库: '一号仓库12456',
    商品类型: '男装',
    仓库名称: '01仓库',
    时间: '2021-06-02 17:58:32',
    状态: '已出库',
    出库数量: 2,
    出库人员时间: '2021-06-02 17:58:45',
    出库类型: '销售出库',
    备注: ''
  },
  {
    对应单号: '天河项目单号',
    仓库: '一号仓库12456',
    商品类型: '男装',
    仓库名称: '01仓库',
    时间: '2021-06-02 17:58:32',
    状态: '已出库',
    出库数量: 2,
    出库人员时间: '2021-06-02 17:58:45',
    出库类型: '销售出库',
    备注: ''
  }
])
// 选择框数据
const options = ref([
  {
    value: 'Option1',
    label: '唱'
  },
  {
    value: 'Option2',
    label: '跳'
  },
  {
    value: 'Option3',
    label: 'rap'
  },
  {
    value: 'Option4',
    label: '篮球和只因'
  }
])
// 分页器
const currentPage4 = ref(4)
const pageSize4 = ref(100)
onMounted(async () => {
  const res = await getInventortOutTableList(
    'https://mockapi.eolink.com/mhNuWI1f7e1a72810542d497358154a44cd9d9fb4b39f57/?responseId=1318425'
  )
  console.log(res)
})

// 处理选中表格行
const handelSelect = (selection) => {
  console.log(selection)
}
</script>
<template>
  <!-- <div>这里是出库单页面</div> -->
  <el-card class="box-card">
    <template #header>
      <div class="head">
        <div class="show0">
          <el-icon style="vertical-align: middle" size="16">
            <House />
          </el-icon>
          <p>出库单列表</p>
        </div>
        <!-- <div class="show" @click="helpPop = true">
          <el-icon><QuestionFilled /></el-icon>
          <p>操作说明</p>
        </div> -->
        <el-button @click="helpPop = true">
          <el-icon><QuestionFilled /></el-icon> 操作说明
        </el-button>
        <!-- 操作说明的会话框 -->
        <el-dialog v-model="helpPop" title="操作说明" width="50%">
          <span>这里是操作说明</span>
        </el-dialog>
      </div>
    </template>
    <div class="wrap">
      <div class="wrap1">
        <!-- 添加 -->
        <el-tooltip
          class="box-item"
          effect="light"
          content="添加出库单"
          placement="bottom"
        >
          <el-button type="primary">添加</el-button>
        </el-tooltip>
        <!-- 批量导出 -->
        <BulkOPe :excelData="tableData" :getOpt="() => [0, 1, 2]">
          <template #excel> </template>
          <template #file> </template>
          <template #print> </template>
        </BulkOPe>
      </div>
      <div class="wrap2">
        <!-- 下拉选择框 -->
        <ChooseSelect
          :options="options"
          des="请选择你要查找的内容"
        ></ChooseSelect>
        <!-- 供应商下拉菜单搜索组件 -->
        <el-dropdown>
          <el-button type="default" size="large">
            <el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item> -->
              <el-input
                placeholder="搜索供应商名称"
                label="供应商"
                title="供应商"
              ></el-input>
              <el-input placeholder="搜索通信地址" label="通信地址"></el-input>
              <el-button type="primary" circle color="#626aef">
                <el-icon><Search /></el-icon>
              </el-button>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="primary" circle color="#626aef">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <Table
      :dataArr="tableData"
      :isSelect="true"
      :isLoading="loading"
      @update:select="handelSelect"
    ></Table>
    <!-- 分页器 -->
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="jumper, sizes, prev, pager, next,total "
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>
<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head p {
  padding: 0 8px;
}
.box-card {
  width: 100%;
  height: 100%;
}
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 20px;
}
button {
  margin: 0 10px;
}
.footer {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}
.show0 {
  display: flex;
  align-items: center;
}
.show {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
</style>
