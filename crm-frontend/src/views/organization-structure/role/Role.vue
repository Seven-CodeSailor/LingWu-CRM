<template>
  <!-- 这里是角色管理 -->
  <BaseDataList
    title="角色管理"
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
            <span>角色管理</span>
            <el-button class="button" @click="handelRefreshTree" text
              >刷新</el-button
            >
          </div>
        </template>
        <!-- 树形菜单标签结构 -->
        <el-tree
          :data="$RoleManage.roleTreeList"
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
        <el-form-item label="名称" :label-width="labelWidth" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="父级栏目" :label-width="labelWidth">
          <!-- 树形选择 -->
          <el-tree-select
            v-model="selectValue"
            :data="$RoleManage.roleTreeList"
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
            :data="$RoleManage.roleTreeList"
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
  <!-- 菜单权限业务 => 抽屉 -->
  <el-drawer
    size="50%"
    v-model="powerDrawer"
    title="菜单权限"
    direction="rtl"
    open-delay="100"
  >
    <el-tree
      :data="dataSource"
      show-checkbox
      node-key="id"
      empty-text="没有数据"
      :expand-on-click-node="false"
      :render-content="renderContent"
    >
      <template #default="{ node }">
        <!-- <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click="append(data)"> Append </a>
            <a @click="remove(node, data)"> Delete </a>
          </span>
        </span> -->
        <span>{{ node.label }}</span>
        <el-checkbox-group v-model="authForm.type">
          <el-checkbox label="增加" name="type" />
          <el-checkbox label="修改" name="type" />
          <el-checkbox label="删除" name="type" />
        </el-checkbox-group>
      </template>
    </el-tree>
    <!-- 用表格来处理权限 -->
    <!-- <el-table row-key="item">
      <el-table-column label="名称"></el-table-column>
      <el-table-column label="权限值"></el-table-column>
      <el-table-column label="修改时间"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="addPermisstion(row)"
            size="small"
            :disabled="row.level == 4 ? true : false"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="primary"
            @click="updatePermisstion(row)"
            size="small"
            :disabled="row.level == 1 ? true : false"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table> -->
    <div class="drawerFooter">
      <el-button @click="powerDrawer = false">取消</el-button>
      <el-button type="primary" :loading="btnLoading" @click="handelPowerSubmit"
        >保存数据</el-button
      >
    </div>
  </el-drawer>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
// import ChooseSelect from '@/components/chooseSelect/chooseSelect.vue'
import { Operation, Plus, Search } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
// 导入api方法
// import { getUserTableList } from '@/apis/organizationStructure/user.js'
import {
  getRoleTree,
  addRoleListApi
} from '../../../apis/organizationStructure/Roles.js'
// 导入 组织结构/角色管理 仓库
import useRoleManageStore from '../../../stores/organizationStructure/rolesManage'
const $RoleManage = useRoleManageStore()
onMounted(async () => {
  //获取角色名称结构树
  await getRoleTree(
    {
      depth: 0,
      pid: 0
    },
    (res) => {
      const { data } = res
      console.log('获取角色名称结构树', data)
      // 默认以第一个角色获取表格数据
      defaultRole.value = data[0]
      currentTreeOption.value = data[0]
      // 处理数据 id =>value name => label
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
      // console.log('矫正后的角色结构树:', newArr)
      // 把数据存到 组织结构/角色管理 仓库
      $RoleManage.setRoleTreeList(newArr)
      console.log('角色管理 仓库数据:', $RoleManage.roleTreeList)
    },
    (error) => {
      console.log(error)
    }
  )
  // 开启表格加载
  baseDataListRef.value.openLoading = true

  const res = await $RoleManage.getTheRoleList({
    keyword: defaultRole.value.name,
    pageIndex: $page.value.currentPage,
    pageSize: $page.value.pageSize,
    pid: ''
  })

  const {
    _rawValue: { data }
  } = res
  // console.log(data)
  // 重新渲染
  sendData.value.total = data.total
  sendData.value.tableData = data.rows
  baseDataListRef.value.openLoading = false
})

// 获取分页数据
const $page = ref()
setTimeout(() => {
  $page.value = baseDataListRef.value.paginationData
  console.log('当前分页器数据', $page.value)
})

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
const handleNodeClick = async (treeData) => {
  console.log('树形菜单数据:', treeData)
  currentTreeOption.value = treeData
  // 基于当前菜单树的数据，重新渲染表格
  // 开启表格加载
  baseDataListRef.value.openLoading = true
  const res = await $RoleManage.getTheRoleList({
    keyword: currentTreeOption.value.name,
    pageIndex: $page.value.currentPage,
    pageSize: $page.value.pageSize,
    pid: ''
  })
  const {
    _rawValue: { data }
  } = res
  // console.log(data)
  // 重新渲染
  sendData.value.total = data.total
  sendData.value.tableData = data.rows
  baseDataListRef.value.openLoading = false
}

// ref数据绑定BaseDataList这个组件
const baseDataListRef = ref(null)
// 表格数据传递
const sendData = ref({
  tableColumnAttribute: [
    {
      prop: 'name',
      label: '角色名称',
      sortable: false
    },
    {
      prop: 'intro',
      label: '角色描述',
      sortable: true
    },
    {
      prop: 'sort',
      label: '排序',
      sortable: true
    },
    {
      prop: 'visible',
      label: '启用',
      useSwitch: true
    }
  ],
  tableData: [
    {
      name: '主管',
      intro: '公司小领导',
      sort: '4',
      visible: ''
    },
    {
      name: '组员',
      intro: '',
      sort: '6',
      visible: ''
    }
  ],
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 分页数组
  pageSizes: [5, 10, 15],
  total: 100
})
// 默认角色
const defaultRole = ref({})
// 当前树形菜单
const currentTreeOption = ref([])
/**
 * 分页器切换处理方法
 */
const handleSizeChange = async (pagesize, currentPage) => {
  // 收集数据
  // console.log(currentTreeOption.value)
  console.log('分页器数据', pagesize, currentPage)
  // 开启表格加载
  baseDataListRef.value.openLoading = true

  const res = await $RoleManage.getTheRoleList({
    keyword: currentTreeOption.value.name,
    pageIndex: currentPage,
    pageSize: pagesize,
    pid: ''
  })
  const {
    _rawValue: { data }
  } = res
  // console.log(data)
  // 重新渲染
  sendData.value.total = data.total
  sendData.value.tableData = data.rows
  baseDataListRef.value.openLoading = false
}

// 操作菜单的数据和处理函数
const dropdownMenuActionsInfo = ref([
  {
    command: '菜单权限',
    handleAction: (row) => {
      powerDrawer.value = true
      console.log('菜单权限回调函数', row)
    },
    actionName: '菜单权限'
  },
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
      // console.log(row.Department)
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

// const formRule = ref({
//   // 部门名称
//   name: [
//     { required: true, message: '请输入名称', trigger: 'blur' },
//     { min: 1, max: 10, message: '名称必须是1-10位的字符', trigger: 'blur' }
//   ],
//   // 父级栏目需要用数据判断用户是否选中
//   // 排位序号
//   sort: [
//     { required: true, message: '请输入排位序号', trigger: 'blur' },
//     {
//       pattern: /^\d+$/,
//       message: '输入格式是任意长度数字',
//       trigger: 'blur'
//     }
//   ]
// })

// 点击添加打开抽屉,置空数据
const handelAddFn = () => {
  // 置空表单数据
  let obj = addForm.value
  for (let key in obj) {
    obj[key] = ''
  }
  addDrawer.value = true
}

/**
 * 刷新业务，点击刷新，刷新菜单树
 */
const handelRefreshTree = async () => {
  //获取角色名称结构树
  await getRoleTree(
    {
      depth: 0,
      pid: 0
    },
    (res) => {
      const { data } = res
      console.log('获取角色名称结构树', data)
      // 默认以第一个角色获取表格数据
      defaultRole.value = data[0]
      currentTreeOption.value = data[0]
      // 处理数据 id =>value name => label
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
      // console.log('矫正后的角色结构树:', newArr)
      // 把数据存到 组织结构/角色管理 仓库
      $RoleManage.setRoleTreeList(newArr)
      // console.log('角色管理 仓库数据:', $RoleManage.roleTreeList)
      ElMessage({
        message: '刷新成功',
        type: 'success'
      })
    },
    (error) => {
      console.log(error)
    }
  )
}

// 按钮提交加载的数据和方法
const btnLoading = ref(false)
const handelAddSubmit = async () => {
  // 添加表单的校验,通过了才能发送添加请求
  // await theAddForm.value.validate()

  // 收集数据
  console.log(
    '名称:',
    addForm.value.name,
    '排序:',
    addForm.value.sort,
    '启用:',
    addForm.value.delivery,
    '介绍:',
    addForm.value.desc,
    '父级栏目:',
    selectValue.value
  )
  // 这里要处理添加接口的逻辑
  await addRoleListApi(
    {
      intro: addForm.value.desc,
      name: addForm.value.name,
      parentID: selectValue.value,
      sort: addForm.value.sort,
      visible: addForm.value.delivery
    },
    (res) => {
      console.log('新增角色:', res)
    },
    (error) => {
      console.log(error)
    }
  )
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

// 菜单权限业务
// 控制权限抽屉打开关闭的数据
const powerDrawer = ref(false)
// 抽屉里的权限树形数据 => 真多啊
const dataSource = ref([
  {
    id: 1,
    label: '客户管理',
    children: [
      {
        id: 2,
        label: '我的客户'
      },
      {
        id: 3,
        label: '下属客户'
      },
      {
        id: 4,
        label: '公共客户'
      },
      {
        id: 5,
        label: '客户联系人'
      },
      {
        id: 6,
        label: '服务记录'
      },
      {
        id: 7,
        label: '销售机会'
      },
      {
        id: 8,
        label: '跟踪记录'
      },
      {
        id: 9,
        label: '销售合同'
      },
      {
        id: 10,
        label: '网站管理'
      }
    ]
  },
  {
    id: 11,
    label: '供应商管理',
    children: [
      {
        id: 12,
        label: '供应商列表'
      },
      {
        id: 13,
        label: '供应商联系人'
      }
    ]
  },
  {
    id: 14,
    label: '采购管理',
    children: [
      {
        id: 15,
        label: '采购订单'
      },
      {
        id: 16,
        label: '采购明细'
      }
    ]
  },
  {
    id: 17,
    label: '库存管理',
    children: [
      {
        id: 18,
        label: '库存清单'
      },
      {
        id: 19,
        label: '入库单'
      },
      {
        id: 20,
        label: '入库明细'
      },
      {
        id: 21,
        label: '出库单'
      },
      {
        id: 22,
        label: '出库明细'
      }
    ]
  },
  {
    id: 23,
    label: '统计分析',
    children: [
      {
        id: 24,
        label: '采购合同统计'
      },
      {
        id: 25,
        label: '多维度统计'
      },
      {
        id: 26,
        label: '销售合同统计'
      }
    ]
  },
  {
    id: 23,
    label: '资金管理',
    children: [
      {
        id: 24,
        label: '资金注入抽取'
      },
      {
        id: 25,
        label: '付款管理',
        children: [
          {
            id: 24,
            label: '付款计划'
          },
          {
            id: 24,
            label: '付款记录'
          },
          {
            id: 24,
            label: '收款记录'
          }
        ]
      },
      {
        id: 26,
        label: '回款管理',
        children: [
          {
            id: 24,
            label: '回款计划'
          },
          {
            id: 24,
            label: '回款记录'
          },
          {
            id: 24,
            label: '开票记录'
          }
        ]
      },
      {
        id: 26,
        label: '收入开支',
        children: [
          {
            id: 24,
            label: '其他收入单'
          },
          {
            id: 24,
            label: '费用支出单'
          }
        ]
      },
      {
        id: 26,
        label: '账户流水记录'
      }
    ]
  },
  {
    id: 23,
    label: '员工管理',
    children: [
      {
        id: 23,
        label: '员工档案'
      },
      {
        id: 23,
        label: '用工记录'
      },
      {
        id: 23,
        label: '个人证书'
      },
      {
        id: 23,
        label: '考核记录'
      },
      {
        id: 23,
        label: '奖罚记录'
      },
      {
        id: 23,
        label: '谈话记录'
      },
      {
        id: 23,
        label: '劳动合同'
      }
    ]
  },
  {
    id: 23,
    label: '基础数据',
    children: [
      {
        id: 23,
        label: '组织结构',
        children: [
          {
            id: 23,
            label: '门店管理'
          },
          {
            id: 23,
            label: '部门管理'
          },
          {
            id: 23,
            label: '角色管理'
          },
          {
            id: 23,
            label: '岗位管理'
          },
          {
            id: 23,
            label: '用户管理'
          }
        ]
      },
      {
        id: 23,
        label: '数据字典',
        children: [
          {
            id: 23,
            label: '字典分类'
          },
          {
            id: 23,
            label: '字典管理'
          }
        ]
      },
      {
        id: 23,
        label: '商品管理',
        children: [
          {
            id: 23,
            label: '商品维护'
          },
          {
            id: 23,
            label: '商品SKU'
          },
          {
            id: 23,
            label: '商品品牌'
          },
          {
            id: 23,
            label: '商品分类'
          },
          {
            id: 23,
            label: '商品类型'
          },
          {
            id: 23,
            label: '商品规格'
          }
        ]
      },
      {
        id: 23,
        label: '财务类型'
      },
      {
        id: 23,
        label: '仓库管理'
      },
      {
        id: 23,
        label: '地区管理'
      }
    ]
  },
  {
    id: 23,
    label: '系统管理',
    children: [
      {
        id: 23,
        label: '系统参数'
      },
      {
        id: 23,
        label: '系统菜单'
      },
      {
        id: 23,
        label: '系统方法'
      },
      {
        id: 23,
        label: '密码修改'
      },
      {
        id: 23,
        label: '消息通知'
      },
      {
        id: 23,
        label: '公告通知'
      },
      {
        id: 23,
        label: '数据库管理'
      },
      {
        id: 23,
        label: '字段扩展'
      },
      {
        id: 23,
        label: '系统升级'
      }
    ]
  }
])
const authForm = ref({
  type: []
})
// 菜单权限抽屉=>保存数据按钮的方法
const handelPowerSubmit = () => {
  btnLoading.value = true
  // 这里模拟发送请求
  setTimeout(() => {
    ElMessage({
      message: '操作成功',
      type: 'success'
    })
    btnLoading.value = false
    powerDrawer.value = false
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
.emptyTable {
  min-width: 800px;
  min-height: 600px;
}
</style>
