<!--
 * @Author: setti5 2283356040@qq.com
 * @Date: 2023-10-28 21:29:26
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-06 21:05:33
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\person-homepage\notice\Notice.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- :total="noticeStore.total" -->

<template>
  <div class="notice">
    <BaseDataList
      title="公告通知"
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="true"
      :page-sizes="[5, 10, 15]"
      :total="noticeStore.total"
      :table-data="noticeStore.tableData"
      :dropdown-menu-actions-info="dropdownMenuActionsInfo"
      :useDropdownMenu="true"
      @updateTableData="handelPageChange"
      
      ref="baseDataListRef"
    >
      <!-- 导航图标 -->
      <template #ico>
        <el-icon>
          <icon-BellFilled />
        </el-icon>
      </template>

      <!-- 中间搜索栏 -->
      <template #menu>
        <div class="menu">
          <div class="left">
            <!-- 左侧按钮区域 -->
            <el-button type="success" @click="addEvent">
              <el-icon style="padding-rigt: 5px">
                <icon-Plus />
              </el-icon>
              添加
            </el-button>
            <el-button
              type="primary"
              icon="IconChatDotRound"
              @click="readBatches"
              >批量已读</el-button
            >

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
            <!-- 搜索按钮：还差数据读取逻辑和加载loading动画 -->
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
    <el-drawer v-model="addDrawer" title="添加通知" >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-form"
      >
        <el-form-item label="通知标题" prop="Title">
          <el-input v-model="form.title" placeholder="输入标题" />
        </el-form-item>
        <el-form-item label="通知对象" prop="toDepartment">
          <ChooseSelect
          v-model="form.ownerDeptId"
            :options="options"
            des="请选通知部门"
            style="width: 60%"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="指定对象" prop="Person">
          <ChooseSelect
          v-model="form.ownerUserId"
            :options="noticeStore.optionsUserName"
            des="请选指定对象"
            style="width: 60%"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="通知内容" prop="Intro">
          <el-input v-model="form.content" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item margin-top="20px">
          <el-button>取消</el-button>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 查看公告的抽屉内容 -->
    <el-drawer v-model="dialogVisible1" title="查看通知" size="40%">
      <el-card>
        <template #header>
          <div class="card-header" style="text-align: center">
            <span style="font-size: 24px; font-weight: 700">{{
              detail.title
            }}</span>
          </div>
        </template>
        <section style="margin-top: 20px">{{ detail.content }}</section>
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible1 = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStockStorageDetailsStore } from '@/stores/inventory/stockstoragedetails.js'
import { useNoticeStore } from '@/stores/person-homepage/notice.js'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ChooseSelect from '@/components/chooseSelect/chooseSelect.vue'

const addDrawerData = async (params) => {
  return await noticeStore.postNoticeStore(params)
}

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

// 表格数据引入
const noticeStore = useNoticeStore()

// 操作栏下拉菜单选项
const dropdownMenuActionsInfo = [
  {
    command: 'check',
    // row为当前行的数据
    handleAction: (row) => {
      dialogVisible1.value = true
      console.log('查看的回调函数', row)
    },
    actionName: '查看'
  },
  {
    command: 'delete',
    handleAction: (row) => {
      ElMessageBox.confirm('您确定要删除该条数据吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
      console.log('删除的回调函数', row)
    },
    actionName: '删除'
  },
]

// 表格标题栏
const tableColumnAttribute = [
  {
    prop: 'title',
    label: '标题'
  },
  {
    prop: 'content',
    label: '发布内容'
  },
  {
    prop: 'createTime',
    label: '发布时间'
  },
  {
    prop: 'createUserId',
    label: '发布人'
  },
  {
    prop: 'status',
    label: '状态',
    useTag: true
  },
  {
    prop: 'ownerUserId',
    label: '接收人'
  }
]

// 放入值的逻辑
const baseDataListRef = ref(null)
const inputValue = ref('')

// 添加抽屜表单
const addDrawer = ref(false)
// 添加公告逻辑
const addEvent = () => {
  addDrawer.value = true
}
const form = ref({
  title: '',
  ownerDeptId: '',
  ownerUserId: '',
  content: '',
})
// 通知中的部门选项
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

// 搜索框条件
const stockStorageDetailsStore = useStockStorageDetailsStore()
// const searchDetails = () => {
//   console.log('t', stockStorageDetailsStore.tableData)
//   if (!inputValue.value) {
//     ElMessage.error('输入不能为空')
//   } else {
//     console.log('pp', baseDataListRef.value.paginationData)
//     baseDataListRef.value.paginationData.pageSize = 5
//     baseDataListRef.value.paginationData.currentPage = 1
//     // 搜索数据的时候就重新初始化页面容量和当前页的页码
//     const params = {
//       pageSize: 5,
//       pageIndex: 1
//     }
//     getStockStorageList(params)
//   }
// }
// const getStockStorageList = async (params) => {
//   baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
//   await stockStorageDetailsStore.getTableData(params)
//   baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
// }

// 查看公告
const detail = ref({
  id: '',
  title: '',
  content: ''
})
const dialogVisible1 = ref(false)
const look = (row) => {
  ;(detail.value.id = row.id),
    (detail.value.title = row.title),
    (detail.value.content = row.content),
    (dialogVisible1.value = true)
}

// 操作下拉菜单的数据
const operateData = ref([
  {
    command: '查看',
    // row为当前行的数据
    handleAction: (row) => {
      addDrawer.value = true
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

//表单提交逻辑
const handleSubmit= () => {
  console.log('sumbit')
  console.log(form.value);
  const params = {
    ...form.value
  }
  params.ownerDeptId = 
  addDrawer.value = false
}
  
// 分页器的数据方法-暮秋
// const handelPageChange = (currentPage, pageSize) => {
//   console.log(currentPage, pageSize);
// }

// 分页逻辑
onMounted(() => {
  const params = {
    pageIndex: 1,
    pageSize: 5
  }
  // getStockStorageList(params)
  noticeStore.getNoticeStore(params)
  noticeStore.getOptionsUserName()

  // 暮秋的逻辑
  // noticeStore.getNoticeApi({
  //     content,
  //     pageIndex,
  //     pageSize,
  //     title
  // })
})
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
// // 表格里的内容换行用(暂无引用)
// :deep(.el-table .cell) {
//   white-space: pre-wrap;
// }
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
