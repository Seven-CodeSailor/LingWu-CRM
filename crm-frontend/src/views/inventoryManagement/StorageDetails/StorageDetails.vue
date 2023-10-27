<script setup>
import { ref } from 'vue'

import {
  House
  // Search,
  // QuestionFilled,
  // ArrowDown
} from '@element-plus/icons-vue'
// import Table from '@/components/table/Table.vue'
// import BulkOPe from '@/components/BulkOpe/BulkOpe.vue'
// import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
// import { getInventortOutTableList } from '@/apis/inventory-manager/index.js'
// // import { ElMessage } from 'element-plus'
// import { ref, onMounted } from 'vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
// // 控制表格是否加载
// const loading = ref(false)
// // 控制操作说明显示隐藏的数据
// const helpPop = ref(false)
// const update = () => {
//   loading.value = true
//   setTimeout(() => {
//     loading.value = false
//   }, 500)
// }
// // 表格数据
// const tableData = ref([
//   {
//     对应单号: '天河项目单号',
//     仓库: '一号仓库12456',
//     商品类型: '男装',
//     仓库名称: '01仓库',
//     时间: '2021-06-02 17:58:32',
//     状态: '已出库',
//     出库数量: 2,
//     出库人员时间: '2021-06-02 17:58:45',
//     出库类型: '销售出库',
//     备注: ''
//   },
//   {
//     对应单号: '天河项目单号',
//     仓库: '一号仓库12456',
//     商品类型: '男装',
//     仓库名称: '01仓库',
//     时间: '2021-06-02 17:58:32',
//     状态: '已出库',
//     出库数量: 2,
//     出库人员时间: '2021-06-02 17:58:45',
//     出库类型: '销售出库',
//     备注: ''
//   },
//   {
//     对应单号: '天河项目单号',
//     仓库: '一号仓库12456',
//     商品类型: '男装',
//     仓库名称: '01仓库',
//     时间: '2021-06-02 17:58:32',
//     状态: '已出库',
//     出库数量: 2,
//     出库人员时间: '2021-06-02 17:58:45',
//     出库类型: '销售出库',
//     备注: ''
//   },
//   {
//     对应单号: '天河项目单号',
//     仓库: '一号仓库12456',
//     商品类型: '男装',
//     仓库名称: '01仓库',
//     时间: '2021-06-02 17:58:32',
//     状态: '已出库',
//     出库数量: 2,
//     出库人员时间: '2021-06-02 17:58:45',
//     出库类型: '销售出库',
//     备注: ''
//   }
// ])
// // 选择框数据
// const options = ref([
//   {
//     value: 'Option1',
//     label: '唱'
//   },
//   {
//     value: 'Option2',
//     label: '跳'
//   },
//   {
//     value: 'Option3',
//     label: 'rap'
//   },
//   {
//     value: 'Option4',
//     label: '篮球和只因'
//   }
// ])
// // 分页器
// const currentPage4 = ref(4)
// const pageSize4 = ref(100)
// onMounted(async () => {
//   const res = await getInventortOutTableList(
//     'https://mockapi.eolink.com/mhNuWI1f7e1a72810542d497358154a44cd9d9fb4b39f57/?responseId=1318425'
//   )
//   console.log(res)
// })

// // 处理选中表格行
// const handelSelect = (selection) => {
//   console.log(selection)
// }

// 数据传递
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'OddNumbers',
      label: '对应单号',
      sortable: false
    },
    {
      prop: 'Warehouse',
      label: '仓库',
      sortable: true
    },
    {
      prop: 'founder',
      label: '创建人/时间'
    },
    {
      prop: 'state',
      label: '状态'
    },
    {
      prop: 'OutboundQuantity',
      label: '出库数量'
    },
    {
      prop: 'OutboundPersonnel',
      label: '出库人员/时间'
    },
    {
      prop: 'OutboundType',
      label: '出库类型'
    },
    {
      prop: 'remark',
      label: '备注'
    }
  ],
  tableData: [
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    },
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    },
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    },
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    },
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    },
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    },
    {
      OddNumbers: '31231231',
      Warehouse: '一号仓库123',
      supplierName: '北京',
      founder: '小白',
      contactAdd: '123123123',
      state: '已出库',
      OutboundQuantity: 20,
      OutboundPersonnel: '小李同学',
      OutboundType: '销售出库',
      remark: '无'
    }
  ],
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 分页数组
  pageSizes: [5, 10, 15],
  total: 100
}
const baseDataListRef = ref(null)
// 操作菜单的数据和处理函数
const dropdownMenuActionsInfo = ref([
  {
    command: '出库',
    // row为当前行的数据
    handleAction: (row) => {
      console.log('出库回调函数', row)
    },
    actionName: '出库'
  },
  {
    command: '删除',
    // row为当前行的数据
    handleAction: (row) => {
      console.log('删除回调函数', row)
    },
    actionName: '删除'
  }
])
</script>
<template>
  <!-- <el-card class="box-card">
    <template #header>
      <div class="head">
        <div class="show0">
          <el-icon style="vertical-align: middle" size="16">
            <House />
          </el-icon>
          <p>出库单列表</p>
        </div>

        <el-button @click="helpPop = true">
          <el-icon><QuestionFilled /></el-icon> 操作说明
        </el-button>
        <el-dialog v-model="helpPop" title="操作说明" width="50%">
          <span>这里是操作说明</span>
        </el-dialog>
      </div>
    </template>
    <div class="wrap">
      <div class="wrap1">
        <el-tooltip
          class="box-item"
          effect="light"
          content="添加出库单"
          placement="bottom"
        >
          <el-button type="primary">添加</el-button>
        </el-tooltip>

        <BulkOPe :excelData="tableData" :getOpt="() => [0, 1, 2]">
          <template #excel> </template>
          <template #file> </template>
          <template #print> </template>
        </BulkOPe>
      </div>
      <div class="wrap2">
        <ChooseSelect
          :options="options"
          des="请选择你要查找的内容"
        ></ChooseSelect>
        <el-dropdown>
          <el-button type="default" size="large">
            <el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
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
    <Table
      :dataArr="tableData"
      :isSelect="true"
      :isLoading="loading"
      @update:select="handelSelect"
    ></Table>
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
  </el-card> -->
  <BaseDataList
    class="card"
    title="出库单列表"
    msg="操作说明"
    :useOperateColumn="true"
    :useDropdownMenu="true"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    :dropdownMenuActionsInfo="dropdownMenuActionsInfo"
    @update-table-data="get"
    ref="baseDataListRef"
  >
    <template #ico>
      <el-icon>
        <House />
      </el-icon>
    </template>
    <template #menu>
      <!-- 表格上面一行 -->
      <div>
        <!-- <el-button id="refresh">刷新</el-button> -->
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
<style scoped>
/* .head {
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
} */
</style>
