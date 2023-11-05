<template>
  <div class="message">
    <BaseDataList
      title="消息通知"
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="true"
      :page-sizes="[5, 10, 15]"
      :total="stockStorageDetailsStore.tableTotal"
      :table-data="noticeStore.data"
      :handle-delete="handleDelete"
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
          <icon-Comment />
        </el-icon>
      </template>
      <!-- 中间搜索栏 -->
      <template #menu>
        <div class="menu">
          <div class="left">
            <el-button type="primary" @click="readBatches">
              <el-icon style="padding-right: 4px">
                <icon-FolderChecked />
              </el-icon>
              标记已读
            </el-button>
            <el-button type="danger" icon="IconDelete" @click="deleteBatches"
              >批量删除</el-button
            >
          </div>
          <!-- 右侧搜索栏 -->
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="输入关键字搜索"
              style="margin-right: 4px; width: auto"
            />
            <!-- 搜索按钮还差读取数据逻辑和加载动画 -->
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

    <!-- 添加的抽屉内容 -->
    <el-drawer v-model="addDrawer" title="添加通知" direction="rtl">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="通知标题" prop="toTitle">
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
          <el-button>取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStockStorageDetailsStore } from '@/stores/inventory/stockstoragedetails.js'
import { ElMessage, ElMessageBox  } from 'element-plus'
import { useNotice } from '../../../stores/inventory/notice'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ChooseSelect from '@/components/chooseSelect/chooseSelect.vue'

// 批量删除的逻辑
const deleteBatches = () => {
  if (!baseDataListRef.value.rows.length) {
    ElMessage.error('请先选择')
  } else {
    console.log('1')
  }
}
// 批量已读的逻辑(批量已读的逻辑未定)
const readBatches = () => {
  if (!baseDataListRef.value.rows.length) {
    ElMessage.success('全部已读')
  } else {
    console.log('1')
  }
}

// 表格数据引入（必须
const noticeStore = useNotice()

// 表格标题栏
const tableColumnAttribute = [
  {
    prop: 'message_type',
    label: '消息类型'
  },
  {
    prop: 'reminder_content',
    label: '提醒内容'
  },
  {
    prop: 'reminder_time',
    label: '提醒时间'
  },
  {
    prop: 'creation_time',
    label: '创建时间'
  },
  {
    prop: 'status',
    label: '状态',
    useTag: true
  },
]
// 批量删除和已读的逻辑需要
const baseDataListRef = ref(null)
const inputValue = ref('')

// 搜索框条件
const stockStorageDetailsStore = useStockStorageDetailsStore()
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
    }
    getStockStorageList(params)
  }
}
const getStockStorageList = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await stockStorageDetailsStore.getTableData(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}

// 分页逻辑
onMounted(() => {
  const params = {
    pageIndex: 1,
    pageSize: 5
  }
  getStockStorageList(params)
  noticeStore.getData()
})

// 删除单条数据
const handleDelete = (row) => {
  console.log('删除', row)
  ElMessageBox.confirm(
    '你确定要删除这条数据吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
}

// 添加抽屜表单
const addDrawer = ref(false)
// 添加通知逻辑
const addEvent = () => {
  addDrawer.value = true
}
// 抽屉中表单逻辑
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
// 添加通知中的部门选项
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

// 提交表单校验规则逻辑（未完待研究
const rules = {
  toTitle: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  toDepartment: [
    {
      required: true,
      message: '通知需要下发的团队员及成员，默认为当前用户及下级成员',
      trigger: 'blur'
    },
    {
      pattern: /^\S{1,10}$/,
      message: '部门名必须是1-10位非空字符',
      trigger: 'blur'
    }
  ],
  toPerson: [
    {
      required: true,
      message: '请输入分此功能针对单独一个用户通知类别名',
      trigger: 'blur'
    },
    {
      pattern: /^\S{1,10}$/,
      message: '用户名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ]
}
//表单提交逻辑
const props = defineProps({
  handleSubmit: {
    type: Function,
    default: () => {
      console.log('sumbit')
    }
  }
})
</script>

<style lang="scss" scoped>
.message {
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
