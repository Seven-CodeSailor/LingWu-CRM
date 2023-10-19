<template>
  <div class="base_data_list">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="left">
            <span style="margin-right: 10px; font-weight: 700">{{
              props.title
            }}</span>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="(item, index) in $route.matched"
                :to="{ path: item.path }"
                :key="index"
                >面包屑</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <el-button
            class="button"
            @click="operatingInstructionDialogVisible = true"
          >
            <el-icon style="margin-right: 4px"> <icon-question /></el-icon
            >操作说明</el-button
          >
        </div>
      </template>
      <!-- 表格的menu操作菜单 -->
      <slot name="menu"></slot>
      <!-- 表格 -->
      <el-table
        :data="props.tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in props.tableColumnAttribute"
          :prop="item.prop"
          :label="item.label"
          :key="item"
        >
        </el-table-column>
        <el-table-column label="操作" v-if="!props.useDropdownMenu">
          <!-- 带图标的按钮操作 -->
          <template #default="{ row }">
            <el-tooltip content="编辑" placement="top">
              <el-button circle type="primary" @click="props.handleEdit(row)">
                <el-icon> <icon-edit /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top"
              ><el-button circle type="danger" @click="props.handleDelete(row)">
                <el-icon> <icon-delete /></el-icon> </el-button></el-tooltip
          ></template>
        </el-table-column>
        <el-table-column label="操作" v-else>
          <!-- 下拉菜单的按钮操作 -->
          <template #default="{ row }">
            <el-dropdown
              trigger="click"
              @command="(command) => handleCommand(command, row)"
            >
              <el-button>
                操作
                <el-icon style="margin-left: 4px"
                  ><icon-caret-bottom
                /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, index) in props?.dropdownMenuActionsInfo"
                    :key="index"
                    :command="item.command"
                    >{{ item.actionName }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown></template
          >
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:current-page="paginationData.currentPage"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="paginationData.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 30px"
      />
      <!-- 操作说明的会话框 -->
      <el-dialog
        v-model="operatingInstructionDialogVisible"
        title="操作说明"
        width="50%"
      >
        <span>{{ props.msg ? props.msg : '测试测试' }}</span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref, defineExpose } from 'vue'

const props = defineProps({
  title: String,
  msg: String,
  tableColumnAttribute: Array,
  useDropdownMenu: Boolean,
  // 下拉菜单
  dropdownMenuActionsInfo: Array,
  // 编辑和删除
  handleDelete: Function,
  handleEdit: Function,
  // 表格数据
  tableData: Array
})

const paginationData = ref({
  currentPage: 1,
  pageSize: 10,
  total: 100,
  pageSizes: [5, 10, 15, 20]
})

const rows = ref([])

const operatingInstructionDialogVisible = ref(false)

const handleCommand = (command, row) => {
  const item = props.dropdownMenuActionsInfo.find((item) => {
    return item.command === command
  })
  item.handleAction(row)
}
const handleSelectionChange = (newRows) => {
  rows.value = newRows
}
// 暴露出被选中的row
defineExpose({
  rows
})
</script>

<style lang="scss" scoped>
.base_data_list {
  .box-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
      }
    }
  }
}

:deep(.el-pagination) {
  justify-content: center;
}
</style>
