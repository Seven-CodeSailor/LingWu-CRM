<template>
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">服务记录</div>
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
        <el-button type="primary" icon="IconPlus" @click="addMyClinet"
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
              style="margin-right: 10px"
              :disabled="selectIdArr.length ? false : true"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
        <BulkOPe
          :getOpt="() => [2, 3]"
          :msgSend="msgSend()"
          :emailSend="emailSend()"
        >
        </BulkOPe>
      </div>
      <div class="right" style="display: flex">
        <el-input
          v-model="content"
          placeholder="输入姓名"
          style="margin-right: 4px; width: 200px"
        />
        <DropDown
          :inputValue1="name"
          inputTitle1="客户名称"
          :inputValue2="address"
          inputTitle2="通信地址"
          @handleSearch="handleSearch"
        ></DropDown>
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails"
          :disabled="content ? false : true"
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
      :data="serviceRecord.tableData"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="客户名称"
        prop="customerName"
        sortable
      ></el-table-column>
      <el-table-column label="服务类型" prop="services"></el-table-column>
      <el-table-column label="服务方式" prop="servicesmodel"></el-table-column>
      <el-table-column label="服务日期" prop="serviceTime"></el-table-column>
      <el-table-column label="花费时间" prop="tlen" sortable></el-table-column>
      <el-table-column label="服务内容" prop="content"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="modify(row)">修改</el-dropdown-item>
                <el-dropdown-item @click="Deletes(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="serviceRecord.tableData.length"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 添加或修改客户信息 -->
  <el-drawer
    v-model="dialogVisible"
    :title="
      serviceRecord.temp.linkmanId === -1 ? '添加服务记录' : '修改服务记录'
    "
    size="50%"
  >
    <el-form
      :model="serviceRecord.temp"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="服务类型">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务类型"
          :options="select.type"
          @update:cid="serviceGettype()"
          ref="serviceType"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务方式"
          :options="select.way"
          @update:cid="serviceGetWay()"
          ref="serviceWay"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务日期">
        <el-col :span="11">
          <el-date-picker
            v-model="serviceRecord.temp.linkName"
            type="date"
            placeholder="请选择服务日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="花费时间(分钟)">
        <el-input-number v-model="serviceRecord.temp.tlen" min="0" />
      </el-form-item>
      <el-form-item label="服务内容">
        <el-input
          v-model="serviceRecord.temp.content"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="contractGetName()"
          ref="customerName"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
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
import useServiceRecord from '@/stores/customer/servicerecord.js'
import useSelect from '@/stores/customer/select.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import {
  queryServiceNote,
  getCustomerServiceType,
  getCustomerServiceWay
} from '@/apis/customer/index.js'

// 初始化数据
const initLinks = async (currentPage, pageSize, customerName) => {
  await queryServiceNote(currentPage, pageSize, customerName)
}
onMounted(() => {
  initLinks()
})
// 我的客户store仓库
const serviceRecord = useServiceRecord()
// 下拉列表仓库
const select = useSelect()
// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
// 当前页数
const currentPage = ref(1)
// 每页数据
const pageSize = ref(5)
const handleSizeChange = (val) => {
  pageSize.value = val
  initLinks(currentPage, pageSize)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initLinks(currentPage, pageSize)
}
// 发送消息按钮回调
const msgSend = (title, desc) => {
  console.log(title, desc)
}
// 发送邮件按钮回调
const emailSend = (title, desc) => {
  console.log(title, desc)
}

let tempLinkData = ref({
  linkmanId: -1, //联系人ID
  cuntomerId: '', //客户ID
  customerName: '', //客户名称
  linkName: '', //联系人名称
  gender: 0, //联系人性别 1=男，0=女
  position: '', //联系人职位
  tel: '', //联系人座机
  mobile: '', //联系人手机
  qicq: '', //联系人QQ
  email: '', //联系人邮箱
  zipcode: '', //联系人邮政编码
  address: '', //联系人地址
  intro: '' //联系人简介
})

const tempLinkDataReset = () => {
  tempLinkData.value = {
    linkmanId: -1, //联系人ID
    cuntomerId: '', //客户ID
    customerName: '', //客户名称
    linkName: '', //联系人名称
    gender: 0, //联系人性别 1=男，0=女
    position: '', //联系人职位
    tel: '', //联系人座机
    mobile: '', //联系人手机
    qicq: '', //联系人QQ
    email: '', //联系人邮箱
    zipcode: '', //联系人邮政编码
    address: '', //联系人地址
    intro: '' //联系人简介
  }
}
const customerName = ref()
const serviceWay = ref()
const serviceType = ref()
// 获取客户名称下拉列表
const contractGetName = async () => {
  await getCustomerName()
  serviceRecord.temp.customerName = customerName.value.value.label
}
// 获取服务类型下拉列表
const serviceGettype = async () => {
  await getCustomerServiceType()
  serviceRecord.temp.services = serviceType.value.value.label
}
// 获取服务方式下拉列表
const serviceGetWay = async () => {
  await getCustomerServiceWay()
  serviceRecord.temp.servicesmodel = serviceWay.value.value.label
}
// 点击添加按钮的回调
const addMyClinet = async () => {
  await getCustomerName()
  await getCustomerServiceType()
  await getCustomerServiceWay()
  serviceRecord.tempReset()
  dialogVisible.value = true
}
// 添加按钮确定回调
const save = () => {
  tempLinkDataReset()
  select.resetData()
  dialogVisible.value = false
}
// 修改按钮回调
const modify = async (row) => {
  await getCustomerName()
  await getCustomerServiceType()
  await getCustomerServiceWay()
  tempLinkData.value.linkmanId = row.linkmanId
  dialogVisible.value = true
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
const deleteByQuery = () => {
  // 删除后重新请求数据
  initLinks()
}

/**
 * 搜索
 */
let content = ref('')
let name = ref('')
let address = ref('')
const searchDetails = () => {}
// 下拉框搜索按钮回调
const handleSearch = () => {
  name.value = ''
  address.value = ''
  searchDetails()
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
const Confirms = () => {
  confirmDelete.value = false
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
</style>
