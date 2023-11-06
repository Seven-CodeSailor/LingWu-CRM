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
    @updateTableData="handleSizeChange"
  >
    <template #ico>
      <el-icon><Operation /></el-icon>
    </template>
    <template #treeMeau>
      <el-card class="tree-card">
        <template #header>
          <div class="card-header">
            <span>用户管理</span>
            <el-button class="button" text @click="handelRefresh"
              >刷新</el-button
            >
          </div>
        </template>
        <!-- 树形菜单标签结构 -->
        <el-tree
          :data="departmentManage.DepartmentTree"
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
          <el-input placeholder="请输入姓名搜索" v-model="searchKey"></el-input>
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
          <el-radio-group v-model="addForm.showGender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="labelWidth">
          <el-tree-select
            v-model="selectValue"
            :data="departmentManage.DepartmentTree"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :props="defaultProps"
            :highlight-current="true"
            @change="handelSelectDep"
          />
        </el-form-item>
        <el-form-item label="职位" :label-width="labelWidth">
          <el-tree-select
            v-model="selectPosition"
            :data="$postStore.usePostList"
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
            :data="userManage.userNameList"
            check-strictly
            default-expand-all
            :render-after-expand="false"
            clearable
            :highlight-current="true"
            @change="handelSelectRole"
          />
        </el-form-item>
        <el-form-item label="手机" :label-width="labelWidth" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="QQ" :label-width="labelWidth" prop="qicq">
          <el-input v-model="addForm.qicq" autocomplete="off" />
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
          <el-radio-group v-model="addForm.showGender">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" :label-width="labelWidth">
          <el-tree-select
            v-model="selectValue"
            :data="departmentManage.DepartmentTree"
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
            :data="$postStore.usePostList"
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
        <el-form-item label="手机" :label-width="labelWidth" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="QQ" :label-width="labelWidth" prop="qicq">
          <el-input v-model="addForm.qicq" autocomplete="off" />
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
import { onMounted, ref } from 'vue'
import { getUserNameList, getPostNameList } from '@/apis/publicInterface.js'
import { getDepartmentTree } from '@/apis/organizationStructure/department.js'
import {
  getUserTableList,
  addUserApi
} from '@/apis/organizationStructure/user.js'
// 导入 组织结构/用户管理 仓库
import useUserManageStore from '@/stores/organizationStructure/usermanage.js'
const userManage = useUserManageStore()
// 导入 组织结构/部门管理 仓库
import useDepartmentManageStore from '@/stores/organizationStructure/departmentManage.js'
const departmentManage = useDepartmentManageStore()
// 导入 组织结构/岗位管理仓库
import usePostManageStore from '@/stores/organizationStructure/postManagement.js'
const $postStore = usePostManageStore()
onMounted(async () => {
  // 获取系统用户名称列表数据
  await getUserNameList(
    { name: 'name' },
    (res) => {
      const { data } = res
      // console.log('获取系统用户名称列表数据', data)
      const arrData = data.map((item) => {
        // 修改字段 id=>value name=>label
        const obj = { value: '', label: '' }
        obj.value = item.id
        obj.label = item.name
        return obj
      })
      console.log('矫正后的数据', arrData)
      // 把数据存到 组织结构/用户管理仓库
      userManage.setUserNameList(arrData)
      // console.log(userManage)
    },
    (error) => {
      if (error) {
        console.log(error)
      }
    }
  )
  // 获取部门名称结构树
  await getDepartmentTree(
    {
      depth: 0,
      pid: 0
    },
    (res) => {
      const { data } = res
      // console.log('获取部门名称结构树', data)
      // 更新默认部门
      defaultDep.value = data[0]
      currentTreeOption.value = data[0]
      // 矫正数据
      const newArr = data.map((item) => {
        for (let key in item) {
          if (key === 'id') {
            item.value = item[key]
          }
          if (key === 'name') {
            item.label = item[key]
          }
        }
        return item
      })
      // 把数据存到 组织结构/部门管理 仓库
      departmentManage.setDepartmentTree(newArr)
      // console.log('存仓库', departmentManage.DepartmentTree)
    },
    (error) => {
      if (error) {
        console.log(error)
      }
    }
  )
  // 获取用户列表数据
  // 开启表格加载效果
  baseDataListRef.value.openLoading = true
  // console.log('id是', defaultDep.value.id)
  // console.log('当前的条数', $page.value.pageSize)
  console.log(
    '收集的数据:',
    '部门id:',
    defaultDep.value.id,
    '当前页',
    $page.value.currentPage,
    '当前条数',
    $page.value.pageSize
  )
  await getUserTableList(
    {
      deptId: defaultDep.value.id,
      name: '',
      pageIndex: $page.value.currentPage,
      pageSize: $page.value.pageSize
    },
    (res) => {
      const { data } = res
      console.log('获取表格数据', res)
      sendData.value.tableData = data.rows
      sendData.value.total = data.total
      baseDataListRef.value.openLoading = false
    },
    (error) => {
      baseDataListRef.value.openLoading = false
      if (error) {
        console.log(error)
      }
    }
  )

  // 获取岗位名称列表数据
  await getPostNameList(
    {
      positionName: ''
    },
    (res) => {
      const { data } = res
      // console.log('获取岗位名称列表数据', data)
      // 矫正数据
      const newArr = data.map((item) => {
        // 修改字段 id=>value name=>label
        const obj = { value: '', label: '' }
        obj.value = item.id
        obj.label = item.name
        return obj
      })
      // console.log('矫正字段', newArr)
      // 存到 组织管理/岗位管理仓库
      setTimeout(() => {
        $postStore.setUserPostList(newArr)
        // console.log('部门仓库', $postStore)
      })
    },
    (error) => {
      if (error) {
        console.log(error)
      }
    }
  )
})
// 获取分页数据
const $page = ref()
setTimeout(() => {
  $page.value = baseDataListRef.value.paginationData
  console.log('当前分页器数据', $page.value)
})
// 定义默认部门 第一个部门
const defaultDep = ref({})
// 刷新部门名称结构树
const handelRefresh = async () => {
  await getDepartmentTree(
    {
      depth: 0,
      pid: 0
    },
    (res) => {
      const { data } = res
      console.log('刷新部门名称结构树', data)
      // 更新默认部门
      defaultDep.value = data[0]
      currentTreeOption.value = data[0]
      // 把数据存到 组织结构/部门管理 仓库
      departmentManage.setDepartmentTree(data)
      // console.log( departmentManage.DepartmentTree)
    },
    (error) => {
      if (error) {
        console.log(error)
      }
    }
  )
}
// const treeDataPos = ref([
//   {
//     value: '1',
//     label: '董事会',
//     children: [
//       {
//         value: '1-1',
//         label: '总经理',
//         children: [
//           {
//             value: '1-1-1',
//             label: '财务总监'
//           },
//           {
//             value: ' 1-1-2',
//             label: '人事总监'
//           },
//           {
//             value: '1-1-3',
//             label: '技术总监'
//           }
//         ]
//       }
//     ]
//   }
// ])
const treeDataRole = ref([
  {
    value: '1',
    label: '超级管理员',
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
          }
        ]
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
  children: 'nodes',
  label: 'name',
  value: 'id'
})
// 点击树节点的事件
const handleNodeClick = async (treeData) => {
  currentTreeOption.value = treeData
  console.log('当前部门:', currentTreeOption.value)
  console.log('当前id:', currentTreeOption.value.id)
  baseDataListRef.value.openLoading = true
  await getUserTableList(
    {
      deptId: currentTreeOption.value.id,
      // name: '',
      pageIndex: $page.value.currentPage,
      pageSize: $page.value.pageSize
    },
    (res) => {
      const { data } = res
      console.log('点树形菜单请求得到的数据', data)
      // 渲染
      sendData.value.tableData = data.rows
      sendData.value.total = data.total
      baseDataListRef.value.openLoading = false
    },
    (error) => {
      baseDataListRef.value.openLoading = false
      if (error) {
        console.log(error)
      }
    }
  )
}
// 当前树形菜单部门数据
const currentTreeOption = ref({})

// 分页器页面数据容量改变函数
const handleSizeChange = async (pagesize, currentPage) => {
  console.log(currentTreeOption.value)
  console.log('条数:', pagesize, '当前页', currentPage)
  // 开启表格加载效果
  baseDataListRef.value.openLoading = true
  // 分页器改变,需要发请求重新获取数据并渲染
  await getUserTableList(
    {
      deptId: currentTreeOption.value.id,
      name: '',
      pageIndex: currentPage,
      pageSize: pagesize
    },
    (res) => {
      const { data } = res
      console.log('分页器改变请求的数据', data)
      // 更新分页器数据
      sendData.value.total = data.total
      // 重新渲染
      // console.log('要改的数组', sendData.value.tableData)
      sendData.value.tableData = data.rows
      baseDataListRef.value.openLoading = false
    },
    (error) => {
      baseDataListRef.value.openLoading = false
      if (error) {
        console.log(error)
      }
    }
  )
}

// ref数据绑定BaseDataList这个组件
const baseDataListRef = ref(null)
// 表格数据传递
const sendData = ref({
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
      prop: 'showGender',
      label: '性别',
      sortable: false
    },
    {
      prop: 'mobile',
      label: '手机',
      sortable: false
    },
    {
      prop: 'qicq',
      label: 'QQ',
      sortable: false
    },
    {
      prop: 'email',
      label: '邮箱',
      sortable: false
    },
    {
      prop: 'deptName',
      label: '部门',
      sortable: false
    },
    {
      prop: 'positionName',
      label: '职位',
      sortable: false
    },
    {
      prop: 'roleName',
      label: '角色',
      sortable: false
    }
  ],
  tableData: [
    {
      account: 'cw',
      name: 'cw',
      showGender: '男',
      mobile: 14763726475,
      qicq: 17385738475,
      email: '17385738475@qicq.com',
      deptName: '商务部',
      positionName: '财务总监',
      roleName: '组员'
    }
  ],
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 分页数组
  pageSizes: [5, 10, 15],
  total: 100
})
// 操作菜单的数据和处理函数
const dropdownMenuActionsInfo = ref([
  {
    command: '修改',
    // row为当前行的数据
    handleAction: (row) => {
      editDrawer.value = true
      console.log('修改回调函数', row)
      // 需要发请求获取没有的数据
      addForm.value.name = row.deptName
      addForm.value.desc = row.DepartmentDes
      addForm.value.sort = row.sort
      console.log(row.deptName)
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
  showGender: '',
  mobile: '',
  qicq: '',
  email: '',
  desc: ''
})
// 表单元素宽度
const labelWidth = ref('100px')
// ref绑定表单
const theAddForm = ref()
const editForm = ref()

// 表单校验规则
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
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的电话格式',
      trigger: 'blur'
    }
  ],
  // qicq
  qicq: [
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

// 点击添加打开抽屉, 置空数据
const handelAddFn = () => {
  // 置空表单数据
  let obj = addForm.value
  for (let key in obj) {
    obj[key] = ''
  }
  selectValue.value = ''
  selectRole.value = ''
  selectPosition.value = ''
  addDrawer.value = true
}

// 按钮提交加载的数据和方法
const btnLoading = ref(false)
const handelAddSubmit = async () => {
  // 添加表单的校验,通过了才能发送添加请求
  await theAddForm.value.validate()
  //判断选择框全部选中
  if (addForm.value.showGender === '') {
    ElMessage('请选择性别')
    return false
  }
  // 矫正性别数据  性别 (1-男，2-女)
  if (addForm.value.showGender === '男') {
    addForm.value.showGender = '1'
  } else {
    addForm.value.showGender = '2'
  }
  if (selectValue.value === '') {
    ElMessage('请选择部门')
    return false
  }
  // 先去处理职位接口!!
  if (selectPosition.value === '') {
    ElMessage('请选择职位')
    return false
  }
  if (selectRole.value === '') {
    ElMessage('请选择角色')
    return false
  }
  console.log(
    '添加表单数据',
    addForm.value,
    '部门id:',
    selectValue.value,
    '职位id',
    selectPosition.value,
    '角色id:',
    selectRole.value
  )
  btnLoading.value = true
  // 这里要处理添加接口的逻辑
  await addUserApi(
    {
      account: addForm.value.account,
      deptID: selectValue.value,
      email: addForm.value.email,
      gender: addForm.value.showGender,
      intro: addForm.value.desc,
      mobile: addForm.value.mobile,
      name: addForm.value.name,
      password: addForm.value.password,
      positionID: selectPosition.value,
      qicq: addForm.value.qicq,
      roleID: selectRole.value
    },
    (res) => {
      const { data } = res
      console.log('添加用户接口返回结果', res)
      // 提示用户
      ElMessage({
        message: data.message,
        type: 'success'
      })
      btnLoading.value = false
      addDrawer.value = false
    },
    (error) => {
      console.log(error)
      btnLoading.value = false
      addDrawer.value = false
    }
  )
  btnLoading.value = false
  addDrawer.value = false
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
const handelSearch = async () => {
  if (searchKey.value === '') {
    ElMessage('搜索关键词不能为空')
    return false
  }
  btnLoading.value = true
  // 开启表格加载效果
  baseDataListRef.value.openLoading = true
  // 分页器改变,需要发请求重新获取数据并渲染
  await getUserTableList(
    {
      deptId: currentTreeOption.value.id,
      name: searchKey.value,
      pageIndex: $page.value.currentPage,
      pageSize: $page.value.pageSize
    },
    (res) => {
      const { data } = res
      console.log('分页器改变请求的数据', data)
      // 更新分页器数据
      sendData.value.total = data.total
      // 重新渲染
      // console.log('要改的数组', sendData.value.tableData)
      sendData.value.tableData = data.rows
      baseDataListRef.value.openLoading = false
      btnLoading.value = false
      ElMessage({
        message: '搜索成功',
        type: 'success'
      })
    },
    (error) => {
      if (error) {
        console.log(error)
      }
    }
  )
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
