<!-- 该组件需要Table、Tree、分页、面包屑组件为子组件 -->
<template>
  <div class="container">
    <div class="app-container">
      <el-row>
        <!-- 左侧树形菜单 -->
        <el-col :span="6" class="left">
          <div>树形菜单</div>
        </el-col>
        <!-- 右侧表格 -->
        <el-col :span="18" class="right">
          <BaseDataList
            :table-column-attribute="sendData.tableColumnAttribute"
            :handle-delete="sendData.handleDelete"
            :handle-edit="sendData.handleEdit"
            :table-data="sendData.tableData"
            :page-sizes="sendData.pageSizes"
            :total="sendData.total"
            @update-table-data="get"
            ref="baseDataListRef"
          >
            <!-- 插槽区 -->
            <template #menu>
              <div>
                插槽区
                <el-button @click="getRows">获取被勾选的列</el-button>
                <el-button @click="changeLoadAnimation"
                  >off或者open表格加载动画></el-button
                >
              </div>
            </template>
          </BaseDataList>
        </el-col>
      </el-row>
      <!-- 下侧为分页 -->
      <el-row class="bottom" v-if="usePage">
        <div>分页组件</div>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import { ref, inject } from 'vue'
let usePage = ref(true)

const sendData = inject('sendData')
const baseDataListRef = ref(null)
const getRows = () => {
  // 获取组件暴露出来的rows
  console.log('rows', baseDataListRef.value.rows)
}
const changeLoadAnimation = () => {
  // 关闭表格加载动画
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}
console.log('sendData', sendData)
</script>

<style scoped></style>
