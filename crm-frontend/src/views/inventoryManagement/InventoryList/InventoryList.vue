<!-- 测试库存清单页面 -->
<template>
  <div class="common-layout">
    测试库存清单页面
    <el-container>
      <el-main>
       

        <el-button type="primary" :icon="Search">Search</el-button>
        <el-button type="primary" :icon="Search">刷新</el-button>
       
      </el-main>
    </el-container>
  </div>

  

</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<style scoped>

</style>


