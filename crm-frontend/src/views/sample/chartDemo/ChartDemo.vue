/* * @Author: seven * @Date: 2023-10-21 22:24:45 * @Last Modified by: seven *
@Last Modified time: 2023-10-21 22:24:45 */

<template>
  <div>
    <SalesKit :getData="getData"></SalesKit>
    <!-- <SalesBoard :getDatas="getDatas"></SalesBoard> -->
  </div>
</template>

<script setup>
import SalesKit from '@/components/chartStatistics/salesManagement/SalesKit.vue'
// import SalesBoard from '@/components/chartStatistics/salesManagement/SalesBoard.vue'
const getData = (timePick = '本周') => {
  let chartData = {}
  switch (timePick) {
    case '本周':
      chartData.contractsNum = [25, 53, 23, 64, 67, 56, 81]
      chartData.amount = [
        100000, 120000, 430000, 590000, 690000, 280000, 810000
      ]
      break
    case '上周':
      chartData.contractsNum = [31, 23, 35, 63, 34, 71, 12]
      chartData.amount = [
        210000, 230000, 520000, 630000, 360000, 320000, 620000
      ]
      break
    case '本月':
      chartData.contractsNum = [35, 63, 37, 72]
      chartData.amount = [120000, 110000, 530000, 590000]
      break
    case '上月':
      chartData.contractsNum = [41, 53, 13, 72]
      chartData.amount = [100000, 120000, 430000, 410000]
      break
    case '本季度':
      chartData.contractsNum = [31, 23, 54]
      chartData.amount = [120000, 140000, 233000]
      break
    case '上季度':
      chartData.contractsNum = [24, 41, 32]
      chartData.amount = [410000, 230000, 220000]
      break
    case '本年':
      chartData.contractsNum = [31, 25, 41, 14]
      chartData.amount = [120000, 140000, 233000, 123000]
      break
    case '上年':
      chartData.contractsNum = [41, 53, 23, 64]
      chartData.amount = [100000, 120000, 430000, 410000]
      break

    default:
  }

  return chartData
}
</script>

<style lang="scss" scoped></style>
