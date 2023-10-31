<template>
  <!-- 这里是用户管理 -->
  <BaseDataList
    title="用户管理"
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
            <span>用户管理</span>
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
    title="添加用户"
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
        <el-form-item label="账号" :label-width="labelWidth" prop="account">
          <el-input v-model="addForm.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="labelWidth" prop="password">
          <el-input v-model="addForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" :label-width="labelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="labelWidth">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="labelWidth">
          <el-tree-select
            v-model="selectValue"
            :data="treeData"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectDep"
          />
        </el-form-item>
        <el-form-item label="职位" :label-width="labelWidth">
          <el-tree-select
            v-model="selectPosition"
            :data="treeDataPos"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectPos"
          />
        </el-form-item>
        <el-form-item label="角色" :label-width="labelWidth">
          <el-tree-select
            v-model="selectRole"
            :data="treeDataRole"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectRole"
          />
        </el-form-item>
        <el-form-item label="手机" :label-width="labelWidth" prop="phone">
          <el-input v-model="addForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="QQ" :label-width="labelWidth" prop="QQ">
          <el-input v-model="addForm.QQ" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="labelWidth" prop="email">
          <el-input v-model="addForm.email" autocomplete="off" />
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
        <el-form-item label="账号" :label-width="labelWidth" prop="account">
          <el-input v-model="addForm.account" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="labelWidth" prop="password">
          <el-input v-model="addForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" :label-width="labelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="labelWidth">
          <el-radio-group v-model="addForm.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="labelWidth">
          <el-tree-select
            v-model="selectValue"
            :data="treeData"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectDep"
          />
        </el-form-item>
        <el-form-item label="职位" :label-width="labelWidth">
          <el-tree-select
            v-model="selectPosition"
            :data="treeDataPos"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectPos"
          />
        </el-form-item>
        <el-form-item label="角色" :label-width="labelWidth">
          <el-tree-select
            v-model="selectRole"
            :data="treeDataRole"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectRole"
          />
        </el-form-item>
        <el-form-item label="手机" :label-width="labelWidth" prop="phone">
          <el-input v-model="addForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="QQ" :label-width="labelWidth" prop="QQ">
          <el-input v-model="addForm.QQ" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="labelWidth" prop="email">
          <el-input v-model="addForm.email" autocomplete="off" />
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
const treeDataPos = ref([
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
const treeDataRole = ref([
  {
    value: '1',
    label: '超级管理员',
    children: [
      {
        value: '1-1',
        label: '主管'
      },
      {
        value: '1-2',
        label: '组员'
      },
      {
        value: '1-3',
        label: '总经理'
      }
    ]
  }
])
// 树形选择绑定值
const selectValue = ref('')
const selectPosition = ref('')
const selectRole = ref('')
// 更新选中值=> 部门
const handelSelectDep = (value) => {
  selectValue.value = value
}
const handelSelectPos = (value) => {
  selectPosition.value = value
}
const handelSelectRole = (value) => {
  selectRole.value = value
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
      prop: 'account',
      label: '账号',
      sortable: false
    },
    {
      prop: 'name',
      label: '姓名',
      sortable: false
    },
    {
      prop: 'sex',
      label: '性别',
      sortable: false
    },
    {
      prop: 'phone',
      label: '手机',
      sortable: false
    },
    {
      prop: 'QQ',
      label: 'QQ',
      sortable: false
    },
    {
      prop: 'email',
      label: '邮箱',
      sortable: false
    },
    {
      prop: 'Department',
      label: '部门',
      sortable: false
    },
    {
      prop: 'duties',
      label: '职位',
      sortable: false
    },
    {
      prop: 'role',
      label: '角色',
      sortable: false
    }
  ],
  tableData: [
    {
      account: 'cw',
      name: 'cw',
      sex: '男',
      phone: 14763726475,
      QQ: 17385738475,
      email: '17385738475@qq.com',
      Department: '商务部',
      duties: '财务总监',
      role: '组员'
    },
    {
      account: 'admin',
      name: '管理员',
      sex: '男',
      phone: 17497374852,
      QQ: 17385738475,
      email: '17385738475@qq.com',
      Department: '零起飞工作室',
      duties: '技术总监',
      role: 'null'
    },
    {
      account: 'test',
      name: 'test',
      sex: '男',
      phone: 16583729576,
      QQ: 17385738475,
      email: '17385738475@qq.com',
      Department: '商务部',
      duties: '董事会',
      role: '总经理'
    },
    {
      account: 'admin',
      name: '',
      sex: '女',
      phone: 16583729576,
      QQ: 17385738475,
      email: '17385738475@qq.com',
      Department: '商务部',
      duties: '董事会',
      role: '超级管理员'
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
  account: '',
  password: '',
  name: '',
  sex: '',
  phone: '',
  QQ: '',
  email: '',
  desc: ''
})
// 表单元素宽度
const labelWidth = ref('100px')
// ref绑定表单
const theAddForm = ref()
const editForm = ref()
//表单校验规则
const formRule = ref({
  // 账号
  account: [
    { required: true, message: '请输入账号名称', trigger: 'blur' },
    { min: 1, max: 15, message: '账号必须是1-15位的字符', trigger: 'blur' }
  ],
  // 密码
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
      message: '密码至少包含一个字母和一个数字且长度大于等于8',
      trigger: 'blur'
    }
  ],
  //名称
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    { min: 1, max: 10, message: '名称必须是1-10位的字符', trigger: 'blur' }
  ],
  // 手机
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的电话格式',
      trigger: 'blur'
    }
  ],
  // QQ
  QQ: [
    { required: true, message: '请输入QQ号', trigger: 'blur' },
    {
      pattern: /^[1-9][0-9]{4,10}$/,
      message: '请输入正确的QQ号',
      trigger: 'blur'
    }
  ],
  // 邮箱
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      message: '请输入正确的邮箱格式',
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
