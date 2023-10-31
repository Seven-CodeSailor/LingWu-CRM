<template>
  <el-card>
    <!-- 操作搜索栏 -->
    <section class="menu">
      <div class="left">
        <el-button type="primary" icon="IconPlus" @click="addMyClinet">
          添加
        </el-button>
        <el-button
          type="primary"
          icon="IconChatDotRound"
          :disabled="selectIdArr.length ? false : true"
          @click="read()"
        >
          批量已读
        </el-button>
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
      </div>
      <div class="right" style="display: flex">
        <el-input
          v-model="content"
          placeholder="输入主题关键字"
          style="margin-right: 4px; width: 200px"
        />
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails()"
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
      :data="dashBoard.announcement"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="公告标题" prop="title"></el-table-column>
      <el-table-column label="发布内容" prop="content"></el-table-column>
      <el-table-column label="发布人" prop="createman"></el-table-column>
      <el-table-column
        label="发布时间"
        prop="createTime"
        sortable
      ></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="接收人" prop="receiver"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="look(row)">查看</el-dropdown-item>
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
      :total="dashBoard.announcement.length"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 添加或修改客户信息 -->
  <el-drawer v-model="dialogVisible" title="添加通知" size="50%">
    <el-form
      :model="tempAnnouncementData"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="通知标题">
        <el-input
          v-model="tempAnnouncementData.title"
          placeholder="请输入通知标题"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="通知对象">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择通知对象"
          :options="dashBoard.department"
          @update:cid="annoDepartment()"
          ref="department"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="指定对象">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择指定对象"
          :options="dashBoard.person"
          @update:cid="annoPerson()"
          ref="person"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input
          v-model="tempAnnouncementData.content"
          type="textarea"
          style="width: 500px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 查看 -->
  <el-drawer v-model="dialogVisible1" title="查看通知" size="60%">
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
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import useDashBoard from '@/stores/dashBoard/dashBoard.js'
import {
  getSystemAnnouncement,
  getDepartment,
  getPerson
} from '@/apis/dashBoard/dashBoard.js'

// 仓库
const dashBoard = useDashBoard()

// 初始化数据
const initAnnouncement = async (currentPage, pageSize, content) => {
  await getSystemAnnouncement(currentPage, pageSize, content)
}
onMounted(() => {
  initAnnouncement(currentPage, pageSize)
})

// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
// 当前页数
const currentPage = ref(1)
// 每页数据
const pageSize = ref(5)
const handleSizeChange = (val) => {
  pageSize.value = val
  initAnnouncement(currentPage, pageSize)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initAnnouncement(currentPage, pageSize)
}

/**
 * 添加
 */
let tempAnnouncementData = ref({
  title: '', //公告标题
  content: '', //发布内容
  createman: '', //发布人
  createTime: '', //发布时间
  state: '', //状态
  receiver: '' //接收人
})
const tempAnnouncementDataReset = () => {
  tempAnnouncementData.value = {
    title: '', //公告标题
    content: '', //发布内容
    createman: '', //发布人
    createTime: '', //发布时间
    state: '', //状态
    receiver: '' //接收人
  }
}
const department = ref()
// 获取通知对象下拉菜单的数据
const annoDepartment = async () => {
  await getDepartment()
}
const person = ref()
// 获取指定对象下拉菜单的数据
const annoPerson = async () => {
  await getPerson()
  tempAnnouncementData.value.receiver = person.value.selectValue.label
}
// 点击添加按钮的回调
const addMyClinet = async () => {
  await getPerson()
  annoDepartment()
  dialogVisible.value = true
}
// 添加按钮确定回调
const save = () => {
  tempAnnouncementDataReset()
  dashBoard.reset()
  dialogVisible.value = false
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
  initAnnouncement(currentPage, pageSize)
}

/**
 * 批量已读
 */
const read = () => {
  // 调用批量已读接口
  initAnnouncement(currentPage, pageSize)
}

/**
 * 搜索
 */
let content = ref('')
const searchDetails = () => {
  content.value = ''
  initAnnouncement(currentPage, pageSize, content)
}

/**
 * 查看
 */
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
