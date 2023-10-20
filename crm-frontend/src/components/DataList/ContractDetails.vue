<template>
  <div class="contract_details">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in $route.matched"
              :to="{ path: item.path }"
              :key="index"
              >{{ item.meta.text }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <el-button @click="$router.go(-1)"
            ><el-icon style="margin-right: 4px"><icon-back /></el-icon
            >返回</el-button
          >
        </div>
      </template>
      <div class="data">
        <div class="left">
          <div class="top">
            <h3 style="font-weight: 700">标题：</h3>
            <span style="font-weight: 700">1234</span>
          </div>
          <el-divider />
        </div>
        <div class="right">
          <div class="top">
            <h3 style="font-weight: 700; margin-right: 90px">标签</h3>
          </div>
          <el-divider />
        </div>
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="User" name="first">User</el-tab-pane>
        <el-tab-pane label="Config" name="second">Config</el-tab-pane>
        <el-tab-pane label="Role" name="third">Role</el-tab-pane>
        <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeName = ref('first')

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.contract_details {
  height: 100%;
  .box-card {
    height: 100%;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .data {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .left {
        width: 49%;
        height: 100%;
        .top {
          height: 12%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
      }
      .right {
        width: 49%;
        height: 100%;
        .top {
          height: 12%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
  }
}
:deep(.el-card__body) {
  height: 60%;
}
:deep(.el-divider--horizontal) {
  margin: 10px 0;
}
</style>
