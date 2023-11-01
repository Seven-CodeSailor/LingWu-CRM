<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="我的客户" name="first">
      <ClientStatistics></ClientStatistics>
    </el-tab-pane>
    <el-tab-pane label="我的商机" name="second">
      <BusinessStatistics></BusinessStatistics>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue'
import BusinessStatistics from './BusinessStatistics.vue'
import ClientStatistics from './ClientStatistics.vue'
const activeName = ref('first')
</script>

<style lang="scss" scoped></style>
