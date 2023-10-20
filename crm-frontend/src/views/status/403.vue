<template>
  <!-- <div class="contain">
    <div class="code">403</div>
    <div class="info">抱歉，你无权访问该页面</div>
  </div> -->
  <CustomDataStatistics
    :data="data"
    style="margin-right: 10%"
  ></CustomDataStatistics>
  <CustomDataPie :data="datas"></CustomDataPie>
</template>

<script setup>
import CustomDataStatistics from '@/components/customDataStatistics/CustomDataStatistics.vue'
import CustomDataPie from '@/components/customDataPie/CustomDataPie.vue'
import { ref } from 'vue'
const data = ref({
  title: '客户数据统计',
  data1: [10, 15, 20],
  data2: [45.0, 20.21, 67.35]
})
const datas = ref({
  title: '数据统计',
  data1: ['甲', '乙', '丙', '丁', '其他'],
  data2: [18, 25, 20, 26, 17]
})
</script>

<style lang="css" scoped>
.contain {
  text-align: center;
  padding: 20%;
}
.code {
  font-size: xxx-large;
  font-weight: bold;
  color: #222222;
}
.info {
  font-weight: bold;
  color: dimgray;
}
</style>
