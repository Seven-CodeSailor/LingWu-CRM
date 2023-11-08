<template>
  <!-- 这里是岗位管理 -->
  <BaseDataList
    title="岗位管理"
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
        <el-button @click="handelAddFn">
          <el-icon type="success" circle>
            <el-icon><Plus /></el-icon
          ></el-icon>
          添加
        </el-button>
        <div class="search">
          <el-input
            placeholder="请输入关键字搜索"
            v-model="searchKey"
          ></el-input>
          <el-button
            type="primary"
            :loading="btnLoading"
            :icon="Search"
            @click="handelSearch"
            >搜索</el-button
          >
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
  <!-- 添加业务=> 抽屉 -->
  <el-drawer
    size="45%"
    v-model="addDrawer"
    title="添加部门"
    direction="rtl"
    open-delay="100"
  >
    <div class="demo-drawer__content">
      <el-form
        ref="theAddForm"
        :model="addForm"
        label-width="120px"
        :rules="formRule"
      >
        <el-form-item label="名称" :label-width="labelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级栏目" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <!-- <ChooseSelect :options="selOptions" des="选择上级"></ChooseSelect> -->
          <!-- 树形选择 -->
          <el-tree-select
            v-model="selectValue"
            :data="treeData"
            check-strictly
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelect"
          />
        </el-form-item>
        <el-form-item label="排序" :label-width="labelWidth" prop="sort">
          <el-input v-model="addForm.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="启用" :label-width="labelWidth">
          <el-switch v-model="addForm.delivery" />
        </el-form-item>
        <el-form-item label="介绍" :label-width="labelWidth">
          <el-input v-model="addForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="drawerFooter">
        <el-button @click="addDrawer = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handelAddSubmit"
          >提交</el-button
        >
      </div>
    </div>
  </el-drawer>
  <!-- 修改业务 => 抽屉 -->
  <el-drawer
    size="45%"
    v-model="editDrawer"
    title="修改部门"
    direction="rtl"
    open-delay="100"
  >
    <div class="demo-drawer__content">
      <el-form
        ref="editForm"
        :model="addForm"
        label-width="120px"
        :rules="formRule"
      >
        <el-form-item label="名称" :label-width="labelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级" :label-width="labelWidth">
          <!-- 调用选择框组件 -->
          <!-- <ChooseSelect :options="selOptions" des="选择上级"></ChooseSelect> -->
          <!-- 树形选择 -->
          <el-tree-select
            v-model="selectValue"
            :data="treeData"
            check-strictly
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelect"
          />
        </el-form-item>
        <el-form-item label="排序" :label-width="labelWidth" prop="sort">
          <el-input v-model="addForm.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item label="启用" :label-width="labelWidth">
          <el-switch v-model="addForm.delivery" />
        </el-form-item>
        <el-form-item label="介绍" :label-width="labelWidth">
          <el-input v-model="addForm.desc" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="drawerFooter">
        <el-button @click="editDrawer = false">取消</el-button>
        <el-button
          type="primary"
          :loading="btnLoading"
          @click="handelEditSubmit"
          >保存数据</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
// import ChooseSelect from '@/components/chooseSelect/chooseSelect.vue'
import { Operation, Plus, Search } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { getRoleTree } from '../../../apis/organizationStructure/postManagement'

onMounted(async () => {
  await getRoleTree(
    {
      depth: 0,
      pid: 0
    },
    (res) => {
      console.log('获取岗位名称结构树成功回调:', res)
      ElMessage({
        message: '获取成功',
        type: 'success'
      })
    }
  )
})

// 树形菜单的数据
const treeData = ref([
  {
    value: '1',
    label: '董事会',
    children: [
      {
        value: '1-1',
        label: '总经理',
        children: [
          {
            value: '1-1-1',
            label: '财务总监'
          },
          {
            value: ' 1-1-2',
            label: '人事总监'
          },
          {
            value: '1-1-3',
            label: '技术总监'
          }
        ]
      }
    ]
  },
  {
    value: '2',
    label: '不懂事会',
    children: [
      {
        value: '2-1',
        label: '鸡'
      },
      {
        value: '2-2',
        label: '你'
      },
      {
        value: '2-3',
        label: '太'
      },
      {
        value: '2-4',
        label: '美'
      }
    ]
  }
])
// 树形选择绑定值
const selectValue = ref('')
// 更新选中值
const handelSelect = (value) => {
  selectValue.value = value
}

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
      label: '职务名称',
      sortable: false
    },
    {
      prop: 'DepartmentDes',
      label: '职务描述',
      sortable: true
    },
    {
      prop: 'sort',
      label: '排序',
      sortable: true
    },
    {
      prop: 'Enable',
      label: '启用',
      useSwitch: true
    }
  ],
  tableData: [
    {
      Department: '总经理',
      DepartmentDes: '公司小领导',
      sort: '4',
      Enable: ''
    },
    {
      Department: '财务总监',
      DepartmentDes: '',
      sort: '6',
      Enable: ''
    },
    {
      Department: '人事总监',
      DepartmentDes: '',
      sort: '4',
      Enable: ''
    },
    {
      Department: '技术总监',
      DepartmentDes: '技术大牛',
      sort: '7',
      Enable: ''
    },
    {
      Department: '蔡徐坤',
      DepartmentDes: '厉不厉害你坤哥',
      sort: '2',
      Enable: ''
    },
    {
      Department: '食堂阿姨',
      DepartmentDes: '干饭人~',
      sort: '3',
      Enable: ''
    },
    {
      Department: '商务总监',
      DepartmentDes: '商务洽谈',
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
      editDrawer.value = true
      console.log('修改回调函数', row)
      // 需要发请求获取没有的数据
      addForm.value.name = row.Department
      addForm.value.desc = row.DepartmentDes
      addForm.value.sort = row.sort
      console.log(row.Department)
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
const addDrawer = ref(false)
// 抽屉表单数据
const addForm = ref({
  name: '',
  region: '选择上级',
  // 排位序号
  sort: '',
  delivery: false,
  desc: ''
})
// 表单元素宽度
const labelWidth = ref('100px')
// ref绑定表单
const theAddForm = ref()
const editForm = ref()
//表单校验规则
const formRule = ref({
  // 部门名称
  name: [
    { required: true, message: '请输入部门名称', trigger: 'blur' },
    { min: 1, max: 10, message: '用户名必须是1-10位的字符', trigger: 'blur' }
  ],
  // 父级栏目需要用数据判断用户是否选中
  // 排位序号
  sort: [
    { required: true, message: '请输入排位序号', trigger: 'blur' },
    {
      pattern: /^\d+$/,
      message: '输入格式是任意长度数字',
      trigger: 'blur'
    }
  ]
})
// 点击添加打开抽屉,置空数据
const handelAddFn = () => {
  // 置空表单数据
  let obj = addForm.value
  for (let key in obj) {
    obj[key] = ''
  }
  addDrawer.value = true
}

// 按钮提交加载的数据和方法
const btnLoading = ref(false)
const handelAddSubmit = async () => {
  // 添加表单的校验,通过了才能发送添加请求
  await theAddForm.value.validate()
  // 这里要处理添加接口的逻辑
  btnLoading.value = true
  setTimeout(() => {
    ElMessage({
      message: '提交成功',
      type: 'success'
    })
    btnLoading.value = false
    addDrawer.value = false
  }, 1000)
}

// 编辑业务
// 操作 => 修改抽屉
// 保存数据 按钮
const handelEditSubmit = async () => {
  // 修改的表单校验,通过才能发送put更新数据请求
  await editForm.value.validate()
  // 在这里处理更新修改的接口
  setTimeout(() => {
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    editDrawer.value = false
  }, 1000)
}
// 控制编辑抽屉打开/关闭的数据
const editDrawer = ref(false)

// 搜索业务
// 输入框绑定的数据
const searchKey = ref('')
// 搜索方法
const handelSearch = () => {
  if (searchKey.value === '') {
    ElMessage('搜索关键词不能为空')
    return false
  }
  btnLoading.value = true
  setTimeout(() => {
    btnLoading.value = false
    ElMessage({
      message: '搜索执行!调接口发请求',
      type: 'success'
    })
  }, 1000)
}
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
  // width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.drawerFooter button {
  margin: 0 40px;
}
</style>
