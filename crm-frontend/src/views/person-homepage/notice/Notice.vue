<template>
  <div class="notice">
    <BaseDataList
      title="公告通知"
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="true"
      :page-sizes="[5, 10, 15]"
      :total="stockStorageDetailsStore.tableTotal"
      :table-data="noticeStore.data"
      :useDropdownMenu="true"
      :dropdownMenuActionsInfo="operateData"
      @update-table-data="
        (pageSize, currentPage) =>
          getStockStorageList({
            pageSize,
            pageIndex: currentPage
          })
      "
      ref="baseDataListRef"
    >
      <!-- 导航图标 -->
      <template #ico>
        <el-icon>
          <icon-BellFilled />
        </el-icon>
      </template>

      <!-- 中部内容区 -->
      <template #menu>
        <div class="menu">
          <div class="left">
            <!-- 添加按钮需要抽屉功能 -->
            <el-button
              type="success"
              style="margin-right: 10px"
              @click="addEvent"
            >
              <el-icon>
                <icon-Plus />
              </el-icon>
              添加
            </el-button>

            <!-- 批量导入 -->
            <BulkOPe
              :excelData="() => tableData"
              :getOpt="() => [0]"
              excelName="库存清单.xlsx"
              tableName="库存清单的sheet表"
            >
            </BulkOPe>
            <!-- 搜索栏 -->
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="输入关键字搜索"
              style="margin-right: 4px; width: auto"
            />
            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="searchDetails"
            >
              <el-icon style="margin-right: 4px"> <icon-search /> </el-icon>
              搜索
            </el-button>
          </div>
        </div>
      </template>
    </BaseDataList>

    <!-- 弹出抽屉内容 -->
    <el-drawer 
      v-model="addFrawer" 
      title="添加通知" 
      direction="rtl"
      placeholder="Activity zone"
    >
      <el-form 
        ref="ruleFormRef"
        :model="ruleForm" 
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="通知标题"  prop="toTitle">
          <el-input v-model="ruleForm.name" placeholder="输入标题" />
        </el-form-item>
        <!-- 输入规则还没改，需要添加 -->
        <el-form-item label="通知对象" prop="toDepartment">
          <!-- 下拉选择框 -->
          <ChooseSelect
            :options="options"
            des="请选通知部门"
            style="width: 60%"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="指定对象" prop="toPerson">
          <ChooseSelect
            :options="options"
            des="请选指定对象"
            style="width: 60%"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input v-model="textarea" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item margin-top="20px">
          <el-button type="primary"  @click="submitForm(ruleFormRef)">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStockStorageDetailsStore } from '@/stores/inventory/stockstoragedetails.js'
import { ElMessage } from 'element-plus'
import { useNotice } from '../../../stores/inventory/notice'
import BaseDataList from '@/views/person-homepage/notice/components/BaseDataList_refresh.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/chooseSelect.vue'

// 数据引入
const noticeStore = useNotice()

// 表格标题栏
const tableColumnAttribute = [
  {
    prop: 'headline',
    label: '标题'
  },
  {
    prop: 'publishing_content',
    label: '发布内容'
  },
  {
    prop: 'publisher',
    label: '发布人'
  },
  {
    prop: 'release_time',
    label: '发布时间'
  },
  {
    prop: 'status',
    label: '状态',
    useTag: true
  },
  {
    prop: 'recipient',
    label: '接收人'
  }
]
const baseDataListRef = ref(null)
const inputValue = ref('')

const stockStorageDetailsStore = useStockStorageDetailsStore()

// 搜索框条件
const searchDetails = () => {
  console.log('t', stockStorageDetailsStore.tableData)
  if (!inputValue.value) {
    ElMessage.error('输入不能为空')
  } else {
    console.log('pp', baseDataListRef.value.paginationData)
    baseDataListRef.value.paginationData.pageSize = 5
    baseDataListRef.value.paginationData.currentPage = 1
    // 搜索数据的时候就重新初始化页面容量和当前页的页码
    const params = {
      pageSize: 5,
      pageIndex: 1
      // 如何知道我输入的是sku名称或商品名
    }
    getStockStorageList(params)
  }
}
const getStockStorageList = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await stockStorageDetailsStore.getTableData(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}

onMounted(() => {
  const params = {
    pageIndex: 1,
    pageSize: 5
  }
  getStockStorageList(params)
  noticeStore.getData()
})

// 操作下拉菜单的数据
const operateData = ref([
  {
    command: '查看',
    // row为当前行的数据
    handleAction: (row) => {
      console.log('查看回调函数', row)
    },
    actionName: '查看'
  },
  {
    command: '刪除',
    // row为当前行的数据
    handleAction: (row) => {
      console.log('刪除回调函数', row)
    },
    actionName: '刪除'
  }
])

// 添加抽屜
const addFrawer = ref(false)
const addEvent = () => {
  addFrawer.value = true
}
const ruleForm = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
const options = ref([
  {
    value: 'Option1',
    label: '部门1'
  },
  {
    value: 'Option2',
    label: '部门2'
  },
  {
    value: 'Option3',
    label: '部门3'
  }
])

// 提交表单校验规则(暂时还没改对应名称)

const rules = {
  toTitle: [
    { required: true, message: '请输入标题',  trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  toDepartment: [
    { required: true, message: '通知需要下发的团队员及成员，默认为当前用户及下级成员', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '部门名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  toPerson: [
    { required: true, message: '请输入分此功能针对单独一个用户通知类别名', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '用户名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ]
}

</script>

<style lang="scss" scoped>
.notice {
  width: 100%;
  height: 100%;
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
    .el-button {
      margin-left: 10px;
    }
  }
}
// 表格里的内容换行用
:deep(.el-table .cell) {
  white-space: pre-wrap;
}
</style>
