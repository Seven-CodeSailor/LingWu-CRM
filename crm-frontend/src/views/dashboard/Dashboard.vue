<template>
  <el-card style="width: 100%">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="系统公告" name="first">
        <Announcement></Announcement>
        <el-space wrap> </el-space>
      </el-tab-pane>
      <el-tab-pane label="提醒消息" name="second">
        <Message></Message>
        <el-space wrap> </el-space>
      </el-tab-pane>
      <el-tab-pane label="我的客户统计信息" name="third">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="el-card"> </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的商机统计信息" name="fouth">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card> </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
// import useDashBoard from '@/stores/dashBoard/dashBoard.js'
import Announcement from './components/Announcement.vue'
import Message from './components/Message.vue'

// const dashBoard = useDashBoard()
const activeName = ref('first')
</script>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  margin-right: 20px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.box {
  display: inline-block;
  width: 100%;
  height: 500px;
  .select {
    margin-left: 60%;
    right: 0;
  }
  .charts {
    height: 100%;
  }
}
</style>
