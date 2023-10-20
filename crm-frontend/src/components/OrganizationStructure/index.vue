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
          <el-row>表格header</el-row>
          <div>表格body</div>
        </el-col>
      </el-row>
      <!-- 下侧为分页 -->
      <el-row class="bottom" v-if="usePag">
        <div>分页组件</div>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
//暂时不知道大伙封的组件要什么数据，先随便写了点
const props = defineProps({
  //是否使用分页
  usePag: {
    type: Boolean,
    required: true,
    //不写的默认值也是false，避免误以为undefind显式指定一个
    default: false
  },
  //分页数据
  //预期接收一个对象，包含当前页和页面规格，以成功调用分页组件
  pageParams: {
    type: Object,
    required: false,
    default: () => {
      return {
        //字段根据后端决定
        currentPage: 1,
        pageSize: 10
      }
    }
  },

  //调用树形组件所需的树状数组数据
  treedata: {
    type: Array,
    required: true
  },

  //表格数据
  tableData: {
    type: Array,
    required: true
  }
})
console.log(props)
</script>

<style scoped></style>
