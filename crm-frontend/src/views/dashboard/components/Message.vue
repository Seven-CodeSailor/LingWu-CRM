<template>
  <el-card>
    <!-- 操作搜索栏 -->
    <section class="menu">
      <div class="left">
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
      :data="dashBoard.message"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="消息类型" prop="msgType"></el-table-column>
      <el-table-column label="提醒内容" prop="content"></el-table-column>
      <el-table-column
        label="提醒时间"
        prop="msgTime"
        sortable
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        sortable
      ></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary" @click="Deletes(row)">删除</el-button>
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
      layout="prev, pager, next, jumper, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
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
import useDashBoard from '@/stores/dashBoard/dashBoard.js'
import { getMessage } from '@/apis/dashBoard/dashBoard.js'

// 仓库
const dashBoard = useDashBoard()

// 初始化数据
const initAnnouncement = async (currentPage, pageSize, content) => {
  await getMessage(currentPage, pageSize, content)
}
onMounted(() => {
  initAnnouncement(currentPage, pageSize)
})

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
