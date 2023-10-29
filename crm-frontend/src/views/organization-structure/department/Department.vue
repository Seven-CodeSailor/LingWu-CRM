<template>
  <!-- <div>部门管理</div> -->
  <BaseDataList
    title="部门管理"
    msg="这里是操作提示"
    ref="baseDataListRef"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    :useDropdownMenu="true"
    :dropdownMenuActionsInfo="dropdownMenuActionsInfo"
  >
    <template #ico>
      <el-icon><Operation /></el-icon>
    </template>
    <template #treeMeau>
      <el-card class="tree-card">
        <template #header>
          <div class="card-header">
            <span>部门管理</span>
            <el-button class="button" text>刷新</el-button>
          </div>
        </template>
        <!-- 树形菜单标签结构 -->
        <el-tree
          :data="treeData"
          :props="defaultProps"
          highlight-current="true"
          default-expand-all="true"
          draggable
          empty-text="树形菜单内容为空"
          @node-click="handleNodeClick"
        />
      </el-card>
    </template>
    <template #menu>
      <div class="meau">
        <!-- 这里是表格头部的控件 -->
        <el-button @click="theDrawer = true">
          <el-icon type="success" circle>
            <el-icon><Plus /></el-icon
          ></el-icon>
          添加
        </el-button>
        <div class="search">
          <el-input placeholder="请输入关键字搜索"></el-input>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </div>
    </template>
  </BaseDataList>
  <!-- 删除确认消息提示框 -->
  <el-dialog v-model="isDelete" title="温馨提示" width="30%">
    <span>你确认要删除吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isDelete = false">取消</el-button>
        <el-button type="primary" @click="isDelete = false"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加业务=>抽屉 -->
  <el-drawer
    size="45%"
    v-model="theDrawer"
    title="添加部门"
    direction="rtl"
    open-delay="100"
  >
    <div class="demo-drawer__content">
      <el-form :model="addForm" label-width="120px" :rules="addRules">
        <el-form-item label="部门名称" :label-width="labelWidth">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部门电话" :label-width="labelWidth">
          <el-input v-model="addForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="部门传真" :label-width="labelWidth">
          <el-input v-model="addForm.fax" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级栏目" :label-width="labelWidth">
          <!-- <el-select v-model="addForm.region" placeholder="请选择上级">
            <el-option label="Area1" value="shanghai" />
            <el-option label="Area2" value="beijing" />
          </el-select> -->
          <!-- 调用选择框组件 -->
          <ChooseSelect :options="selOptions" des="选择上级"></ChooseSelect>
        </el-form-item>
        <el-form-item label="排位序号" :label-width="labelWidth">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否启用" :label-width="labelWidth">
          <el-switch v-model="addForm.delivery" />
        </el-form-item>
        <el-form-item label="部门介绍" :label-width="labelWidth">
          <el-input v-model="addForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="drawerFooter">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handelAddSubmit"
          >提交</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ChooseSelect from '@/components/chooseSelect/chooseSelect.vue'
import { Operation, Plus, Search } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// 树形菜单的数据
const treeData = ref([
  {
    label: '零起飞工作室',
    children: [
      {
        label: '商务部'
      },
      {
        label: '行政部'
      },
      {
        label: '技术部'
      },
      {
        label: '篮球部'
      },
      {
        label: '财务部'
      }
    ]
  }
])
const defaultProps = ref({
  children: 'children',
  label: 'label'
})
// 点击树节点的事件
const handleNodeClick = (data) => {
  console.log('树形菜单数据:', data)
}

// ref数据绑定BaseDataList这个组件
const baseDataListRef = ref(null)
// 表格数据传递
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'Department',
      label: '部门名称',
      sortable: false
    },
    {
      prop: 'DepartmentDes',
      label: '部门描述',
      sortable: true
    },
    {
      prop: 'sort',
      label: '排序'
    },
    {
      prop: 'Enable',
      label: '启用'
    }
  ],
  tableData: [
    {
      Department: '商务部',
      DepartmentDes: '商务洽谈的部门',
      sort: '4',
      Enable: ''
    },
    {
      Department: '零起飞工作室',
      DepartmentDes: '吃苦耐劳部门',
      sort: '6',
      Enable: ''
    },
    {
      Department: '行政部',
      DepartmentDes: '公司政策部门',
      sort: '4',
      Enable: ''
    },
    {
      Department: '技术部',
      DepartmentDes: '技术大佬聚集地',
      sort: '7',
      Enable: ''
    },
    {
      Department: 'yuki部',
      DepartmentDes: '员工保护协会',
      sort: '2',
      Enable: ''
    },
    {
      Department: '财务部',
      DepartmentDes: '财务部门',
      sort: '3',
      Enable: ''
    },
    {
      Department: '商务部',
      DepartmentDes: '吃苦耐劳部门',
      sort: '12',
      Enable: ''
    }
  ],
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 分页数组
  pageSizes: [5, 10, 15],
  total: 100
}
// 操作菜单的数据和处理函数
const dropdownMenuActionsInfo = ref([
  {
    command: '修改',
    // row为当前行的数据
    handleAction: (row) => {
      console.log('修改回调函数', row)
    },
    actionName: '修改'
  },
  {
    command: '删除',
    // row为当前行的数据
    handleAction: (row) => {
      isDelete.value = true
      console.log('删除回调函数', row)
    },
    actionName: '删除'
  }
])

// 删除消息提示
const isDelete = ref(false)
// 控制抽屉打开关闭的数据
const theDrawer = ref(false)
// 抽屉表单数据
const addForm = ref({
  name: '',
  phone: '',
  fax: '',
  region: '选择上级',
  delivery: false,
  desc: ''
})
// 表单元素宽度
const labelWidth = ref('100px')
//表单校验规则
const addRules = ref({})

// 按钮提交加载的数据和方法
const btnLoading = ref(false)
const handelAddSubmit = () => {
  btnLoading.value = true
  setTimeout(() => {
    ElMessage({
      message: '提交成功',
      type: 'success'
    })
    btnLoading.value = false
  }, 1000)
}

// 选择框数据
const selOptions = ref([
  {
    value: 'Option1',
    label: '零起飞工作室'
  },
  {
    value: 'Option2',
    label: '商务部'
  },
  {
    value: 'Option3',
    label: '行政部'
  },
  {
    value: 'Option4',
    label: '技术部'
  },
  {
    value: 'Option5',
    label: 'yuki部'
  },
  {
    value: 'Option6',
    label: '财务部'
  }
])
</script>

<style lang="scss" scoped>
.tree-card {
  min-width: 200px;
  min-height: 500px;
  width: 300px;
  height: 600px;
  margin-right: 50px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
// 表格菜单头样式
.meau {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search {
  display: flex;
}
// 抽屉底部按钮样式
.drawerFooter {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
