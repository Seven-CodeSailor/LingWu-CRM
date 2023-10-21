/** @Author: seven * @Date: 2023-10-19 23:51:18 * @Last Modified by: seven *
@Last Modified time: 2023-10-20 11:03:15 **/

<!-- 销售管理 数量统计 -->

<template>
  <!-- 销售管理的div标签 -->
  <div class="salesKit">
    <el-row>
      <el-select
        class="chartCheckBox"
        v-model="timePick"
        placeholder="请选择时间范围"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-row>
    <div class="chart" ref="chartRef"></div>
  </div>
</template>

<script setup>
// 局部引入echarts
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
//day.js年份插件
dayjs.extend(quarterOfYear)

// 相应时间返回的方法
function timeSpan() {
  let start = ''
  let end = ''

  switch (timePick.value) {
    case '本年':
      start = dayjs().startOf('year').format('YYYY-MM-DD')
      end = dayjs().endOf('year').format('YYYY-MM-DD')
      break
    case '上年':
      start = dayjs().add(-1, 'year').startOf('year').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'year').endOf('year').format('YYYY-MM-DD')
      break
    case '下年':
      start = dayjs().add(1, 'year').startOf('year').format('YYYY-MM-DD')
      end = dayjs().add(1, 'year').endOf('year').format('YYYY-MM-DD')
      break
    case '上半年':
      start = dayjs().startOf('year').format('YYYY-MM-DD')
      end = dayjs().endOf('year').subtract(6, 'month').format('YYYY-MM-DD')
      break
    case '下半年':
      start = dayjs().startOf('year').add(6, 'month').format('YYYY-MM-DD')
      end = dayjs().endOf('year').format('YYYY-MM-DD')
      break
    case '本季度':
      start = dayjs().startOf('quarter').format('YYYY-MM-DD')
      end = dayjs().endOf('quarter').format('YYYY-MM-DD')
      break
    case '上季度':
      start = dayjs().add(-1, 'quarter').startOf('quarter').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'quarter').endOf('quarter').format('YYYY-MM-DD')
      break
    case '下季度':
      start = dayjs().add(1, 'quarter').startOf('quarter').format('YYYY-MM-DD')
      end = dayjs().add(1, 'quarter').endOf('quarter').format('YYYY-MM-DD')
      break
    case '本月':
      start = dayjs().startOf('month').format('YYYY-MM-DD')
      end = dayjs().endOf('month').format('YYYY-MM-DD')
      break
    case '上月':
      start = dayjs().add(-1, 'month').startOf('month').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    case '下月':
      start = dayjs().add(1, 'month').startOf('month').format('YYYY-MM-DD')
      end = dayjs().add(1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    case '本周':
      start = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
      end = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD')
      break
    case '上周':
      start = dayjs()
        .add(-1, 'week')
        .startOf('week')
        .add(1, 'day')
        .format('YYYY-MM-DD')
      end = dayjs()
        .add(-1, 'week')
        .endOf('week')
        .add(1, 'day')
        .format('YYYY-MM-DD')
      break
    case '下周':
      start = dayjs()
        .add(1, 'week')
        .startOf('week')
        .add(1, 'day')
        .format('YYYY-MM-DD')
      end = dayjs()
        .add(1, 'week')
        .endOf('week')
        .add(1, 'day')
        .format('YYYY-MM-DD')
      break
    case '今天':
      start = dayjs().format('YYYY-MM-DD')
      end = dayjs().format('YYYY-MM-DD')
      break
    case '昨天':
      start = dayjs().add(-1, 'day').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'day').format('YYYY-MM-DD')
      break
    case '明天':
      start = dayjs().add(1, 'day').format('YYYY-MM-DD')
      end = dayjs().add(1, 'day').format('YYYY-MM-DD')
      break
    case '过去7天':
      start = dayjs().add(-7, 'day').format('YYYY-MM-DD')
      end = dayjs().format('YYYY-MM-DD')
      break
    case '过去30天':
      start = dayjs().add(-30, 'day').format('YYYY-MM-DD')
      end = dayjs().format('YYYY-MM-DD')
      break
    case '未来7天':
      start = dayjs().format('YYYY-MM-DD')
      end = dayjs().add(7, 'day').format('YYYY-MM-DD')
      break
    case '未来30天':
      start = dayjs().format('YYYY-MM-DD')
      end = dayjs().add(30, 'day').format('YYYY-MM-DD')
      break
    default:
  }
  return [start, end]
}

// 下拉选择框选项 分别为本周 上周 本月 上月等等

const options = [
  {
    value: '本周',
    label: '本周'
  },
  {
    value: '上周',
    label: '上周'
  },
  {
    value: '本月',
    label: '本月'
  },
  {
    value: '上月',
    label: '上月'
  },
  {
    value: '本季度',
    label: '本季度'
  },
  {
    value: '上季度',
    label: '上季度'
  },
  {
    value: '本年',
    label: '本年'
  },
  {
    value: '上年',
    label: '上年'
  }
]

let props = defineProps({
  // 获取数据
  getData: {
    type: Function,
    require: true,
    default: (timePick = 0) => {
      console.log(timePick)
    }
  }
})

// 用户在下拉选择框选择的时间
let timePick = ref()

// 监听用户选择的时间
watch(timePick, () => {
  chartData.value = props.getData()
  result.value = timeSpan()
  console.log(result.value)
})

let result = ref([])

// 横坐标时间 展示数据
function timeSetting() {
  console.log(result.value[0])
  let str = result.value[0]
  var dateList = []
  for (var i = 0; i < 7; i++) {
    var d1 = dayjs(str).add(i, 'day').format('MM-DD')
    dateList.push(d1)
  }
  return dateList
}

// 图表数据 (目前使用的是写死的数据)
let chartData = ref({
  // 合同个数
  contractsNum: [25, 43, 63, 58, 89, 100, 32],
  // 金额
  amount: [210000, 120000, 430000, 590000, 690000, 280000, 810000]
})
// 获取绑定的dom元素
let chartRef = ref()

// 挂载时显示图表
onMounted(() => {
  // 父组件是同级目录下的ParentData.vue
  chartData.value = props.getData()
  console.log(chartData.value)

  // 初始化图表
  initChart()
})

// 监听器 图表数据发生变化时 重新渲染图表
watch(chartData, () => {
  // 下拉框选项更改时，需要重新初始化图表

  chartData.value = props.getData()
  initChart()
})

// 初始化图表
let initChart = () => {
  // 初始化图表
  let myEchart = echarts.init(chartRef.value)

  let option = {
    // 主标题设置
    title: {
      // 主标题文本
      text: '销售简报-新增数据统计'
    },
    // 图例组件
    legend: {
      show: true
    },
    // 修改坐标系显示大小
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    tooltip: {
      show: true
    },
    // x轴
    xAxis: {
      type: 'category',
      // 刻度线指示器 用来显示实时数值
      axisPointer: {
        show: true
      },
      axisLabel: {
        showMaxLabel: true,
        showMinLabel: true
      },
      axisTick: {
        alignWithLabel: true
      },
      // 横坐标展示时间
      data: timeSetting()
    },
    // y轴
    yAxis: [
      // 左侧Y轴
      {
        type: 'value',
        //
        axisTick: {
          show: true
        },
        axisPointer: {
          show: true
        },
        name: '个数',
        axisLine: {
          show: true
        },
        // 刻度标签
        axisLabel: {
          show: true,
          // 单位以及刻度位置
          formatter: '{value} 个',
          align: 'inside',
          margin: 50
        }
      },
      // 右侧Y轴
      {
        type: 'value',
        // 刻度线与两侧的距离
        boundaryGap: ['20%', '20%'],
        min: '0',
        // max: `${Math.max(...data.value.amount) || 0}`,

        // 标签指示器
        axisPointer: {
          show: true
        },
        name: '元(人民币)',
        // 刻度标签
        axisLine: {
          show: true
        },
        axisLabel: {
          show: true,
          // 单位以及刻度位置
          formatter: '{value} 元',
          align: 'inside',
          margin: 10
        }
      }
    ],
    // 系列
    series: [
      {
        name: '新增商机数',
        // bar 表示是柱状图
        type: 'bar',
        smooth: true,
        barWidth: '10%',
        itemStyle: {
          // 各个柱形图颜色
          color: function (params) {
            let colorList = [
              '#FFAA1D',
              '#FFAA1D',
              '#FFAA1D',
              '#FFAA1D',
              '#FFAA1D',
              '#FFAA1D',
              '#FFAA1D',
              '#FFAA1D'
            ]
            return colorList[params.dataIndex]
          }
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: chartData.value.contractsNum
      },
      {
        name: '新增合同数',
        // bar 表示是柱状图
        type: 'bar',
        smooth: true,
        barWidth: '10%',
        itemStyle: {
          // 各个柱形图颜色
          color: function (params) {
            let colorList = [
              '#0000CD',
              '#0000CD',
              '#0000CD',
              '#0000CD',
              '#0000CD',
              '#0000CD',
              '#0000CD',
              '#0000CD'
            ]
            return colorList[params.dataIndex]
          }
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: chartData.value.contractsNum
      },
      {
        name: '新增跟进记录数',
        // bar 表示是柱状图
        type: 'bar',
        smooth: true,
        barWidth: '10%',
        itemStyle: {
          // 各个柱形图颜色
          color: function (params) {
            let colorList = [
              '#E2062C',
              '#E2062C',
              '#E2062C',
              '#E2062C',
              '#E2062C',
              '#E2062C',
              '#E2062C',
              '#E2062C'
            ]
            return colorList[params.dataIndex]
          }
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: chartData.value.contractsNum
      },
      {
        name: '新增联系人数',
        // bar 表示是柱状图
        type: 'bar',
        smooth: true,
        barWidth: '10%',
        itemStyle: {
          // 各个柱形图颜色, 每一行数据的颜色应该相同
          color: function (params) {
            let colorList = [
              '#2D383A',
              '#2D383A',
              '#2D383A',
              '#2D383A',
              '#2D383A',
              '#2D383A',
              '#2D383A',
              '#2D383A'
            ]
            return colorList[params.dataIndex]
          }
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: chartData.value.contractsNum
      },
      {
        name: '金额',
        // bar 表示是柱状图
        type: 'line',
        yAxisIndex: 1,
        // 对应轴线的数据
        data: chartData.value.amount
      }
    ]
  }

  myEchart.setOption(option)
}
</script>

<style scoped>
.salesKit {
  width: 1300px;
  height: 600px;
}
/* 图表样式 */
.chart {
  margin-left: 2%;
  margin-right: 2%;
  width: 1000px;
  height: 600px;
}
.chartCheckBox {
  margin-left: 1100px;
}
</style>
