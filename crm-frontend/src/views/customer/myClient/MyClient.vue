<template>
  <!-- <div>我的客户</div> -->
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">我的客户</div>
      </h3>
      <el-button
        class="button"
        @click="operatingInstructionDialogVisible = true"
      >
        <el-icon style="margin-right: 4px"> <icon-question /></el-icon
        >操作说明</el-button
      >
    </header>
    <!-- 操作搜索栏 -->
    <section class="menu">
      <div class="left">
        <el-button
          type="primary"
          icon="IconPlus"
          @click="addOrUpdateClient.addMyClinet()"
          >添加</el-button
        >
        <el-popconfirm
          :title="`你确定要删除这些选择的客户吗?`"
          width="260px"
          @confirm="deleteByQuery"
        >
          <template #reference>
            <el-button
              type="danger"
              icon="IconDelete"
              :disabled="selectIdArr.length ? false : true"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
        <el-button
          type="primary"
          style="margin-right: 10px"
          :disabled="selectIdArr.length ? false : true"
          @click="invesHightsea"
          >批量投入公海</el-button
        >
        <BulkOPe
          :getOpt="() => [0, 1]"
          :exportFile="exportFile()"
          :action="action"
          :importExcel="importExcel(fileList)"
        >
        </BulkOPe>
      </div>
      <div class="right" style="display: flex">
        <ChooseSelect
          style="margin-right: 10px"
          des="最近联系时间"
          :options="options"
        ></ChooseSelect>
        <ChooseSelect
          style="margin-right: 10px"
          :options="options"
          des="下次联系时间"
        ></ChooseSelect>
        <el-input
          v-model="name"
          placeholder="输入客户名称关键词"
          style="margin-right: 4px; width: 200px"
        />
        <DropDown
          :inputValue1="tel"
          inputTitle1="座机"
          :inputValue2="mobile"
          inputTitle2="手机号"
          :inputValue3="address"
          inputTitle3="通信地址"
          @handleSearch="handleSearch"
        ></DropDown>
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails"
          :disabled="name ? false : true"
          icon="IconSearch"
        >
          搜索</el-button
        >
      </div>
    </section>
    <!-- 表格部分 -->
    <el-table
      style="width: 100%; margin-bottom: 20px"
      table-layout="auto"
      :data="myclient.tableData"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="客户名称" prop="name" sortable></el-table-column>
      <el-table-column label="归属于" prop="belong"></el-table-column>
      <el-table-column
        label="上次联系"
        prop="lastContact"
        sortable
      ></el-table-column>
      <el-table-column label="联系内容" prop="content"></el-table-column>
      <el-table-column
        label="下次联系"
        prop="nextContact"
        sortable
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="addContacts.addContact(row)"
                  >添加联系人</el-dropdown-item
                >
                <el-dropdown-item @click="communicate.addCommunicate(row)"
                  >添加沟通记录</el-dropdown-item
                >
                <el-dropdown-item divided @click="service.addService(row)"
                  >添加服务记录</el-dropdown-item
                >
                <el-dropdown-item @click="opportunity.addOpportunity(row)"
                  >添加销售机会</el-dropdown-item
                >
                <el-dropdown-item divided @click="contract.addContract(row)"
                  >添加合同</el-dropdown-item
                >
                <el-dropdown-item divided @click="details.detail(row)"
                  >详情</el-dropdown-item
                >
                <el-dropdown-item @click="addOrUpdateClient.modify(row)"
                  >修改</el-dropdown-item
                >
                <el-dropdown-item @click="Deletes(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="myclient.tableData.length"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 添加或修改客户信息 -->
  <AddOrUpdateClient ref="addOrUpdateClient"></AddOrUpdateClient>
  <!-- 添加联系人 -->
  <AddContact ref="addContacts"></AddContact>
  <!-- 添加沟通记录 -->
  <Communicate ref="communicate"></Communicate>
  <!-- 添加服务记录 -->
  <Service ref="service"></Service>
  <!-- 添加销售机会 -->
  <Opportunity ref="opportunity"></Opportunity>
  <!-- 添加合同 -->
  <Contract ref="contract"></Contract>
  <!-- 查看详情 -->
  <Detail ref="details"></Detail>
  <!-- 删除确认 -->
  <el-dialog
    v-model="confirmDelete"
    title="删除"
    width="30%"
    :before-close="(deleteId = null)"
  >
    <span style="color: red; margin-left: 33%; font-size: 24px"
      >是否确认删除</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmDelete = false">取消</el-button>
        <el-button type="danger" @click="Confirms"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useMyClient from '@/stores/customer/myclient.js'
import {
  getCustomer,
  deleteCustomer,
  invesHightSea
} from '@/apis/customer/index.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import AddOrUpdateClient from './components/AddOrUpdateClient.vue'
import AddContact from './components/AddContact.vue'
import Communicate from './components/Communicate.vue'
import Service from './components/Service.vue'
import Opportunity from './components/Opportunity.vue'
import Contract from './components/Contract.vue'
import Detail from './components/Detail.vue'

// 添加或修改客户的组件实例
const addOrUpdateClient = ref()

// 添加联系人的组件实例
const addContacts = ref()

// 添加沟通记录的组件实例
const communicate = ref()

// 添加服务记录的组件实例
const service = ref()

// 添加销售记录的组件实例
const opportunity = ref()

// 添加合同的组件实例
const contract = ref()

//查看详情的组件实例
const details = ref()

// 初始化数据
const initCustomer = async (currentPage, pageSize) => {
  await getCustomer(currentPage, pageSize)
}
onMounted(() => {
  initCustomer(currentPage, pageSize)
})
// 我的客户store仓库
const myclient = useMyClient()
// 当前页数
let currentPage = ref(1)
// 每页数据
let pageSize = ref(5)
const handleSizeChange = (val) => {
  pageSize.value = val
  initCustomer(currentPage, pageSize)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initCustomer(currentPage, pageSize)
}
// 导出文件的按钮回调
const exportFile = () => {}

// 导入文件-文件上传的全地址
const action = ref('')

//导入文件的按钮回调
const importExcel = (fileList) => {
  console.log(fileList)
}

// 最近联系时间的选项
const options = ref([
  {
    value: 'Option1',
    label: '最近三天'
  },
  {
    value: 'Option2',
    label: '最近一周'
  },
  {
    value: 'Option3',
    label: '最近半月'
  },
  {
    value: 'Option4',
    label: '最近一月'
  },
  {
    value: 'Option5',
    label: '最近三月'
  },
  {
    value: 'Option6',
    label: '最近六月'
  },
  {
    value: 'Option7',
    label: '最近一年'
  }
])

/**
 * 搜索
 */
let tel = ref('')
let mobile = ref('')
let address = ref('')
// 下拉框搜索按钮回调
const handleSearch = () => {
  tel.value = ''
  mobile.value = ''
  address.value = ''
}

/**
 * 批量删除
 */
// 存储批量删除的客户的id
let selectIdArr = ref([])
// table复选框勾选时触发的事件
const selectChange = (value) => {
  selectIdArr.value = value
}
// 批量删除按钮
const deleteByQuery = async () => {
  await deleteCustomer(selectIdArr, () => {
    ElMessage.success('批量删除成功')
  })
  // 删除后重新请求数据
  initCustomer()
}

/**
 * 批量投入公海
 */
const invesHightsea = async () => {
  await invesHightSea(selectIdArr, () => {
    ElMessage.success('批量投入成功')
  })
  initCustomer()
}

/**
 * 删除
 */
let confirmDelete = ref(false)
let deleteId = ref()
// 删除按钮回调
const Deletes = (row) => {
  deleteId.value = row.id
  confirmDelete.value = true
}
// 确定删除
const Confirms = () => {
  confirmDelete.value = false
  initCustomer(currentPage, pageSize)
  ElMessage.success('删除成功')
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
.padding-bottom-5 {
  padding-bottom: 5px;
}
</style>
