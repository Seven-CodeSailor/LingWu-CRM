<template>
  <div class="box">
    <el-select v-model="time" class="select" placeholder="请选择时间">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

let props = defineProps({
  // 获取图表所需数据
  getData: {
    type: Function,
    require: true,
    default: (time = 1) => {
      console.log(time)
    }
  }
})

// 图表数据
let data = ref({
  title: '数据统计',
  contractsNumber: [0, 0, 0],
  amount: [0, 0, 0]
})

let charts = ref()

onMounted(() => {
  data.value = props.getData()
  initData()
})

// 初始化数据列表
let initData = () => {
  let mychart = echarts.init(charts.value)
  //设置配置项
  let option = {
    title: {
      text: data.value.title,
      show: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: ['我的客户', '下属客户', '公海客户']
    },
    yAxis: [
      {
        type: 'value',
        name: '合同个数',
        position: 'left',
        minInterval: 1,
        axisLabel: {
          formatter: '{value} 个'
        }
      },
      {
        type: 'value',
        name: '合同金额/万元(人民币)',
        position: 'right',
        min: '0',
        max: `${Math.max(...data.value.amount) || 0}`,
        axisLabel: {
          formatter: '{value} 万'
        }
      }
    ],
    series: [
      {
        name: '合同数',
        type: 'bar',
        yAxisIndex: 0,
        data: data.value.contractsNumber,
        itemStyle: {
          normal: {
            //这里是重点
            color: function (params) {
              //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
              let colorList = [
                '#194f97',
                '#555555',
                '#bd6b08',
                '#00686b',
                '#c82d31',
                '#625ba1'
              ]
              return colorList[params.dataIndex]
            }
          }
        }
      },
      {
        name: '金额数',
        type: 'bar',
        smooth: true,
        yAxisIndex: 0,
        data: data.value.amount,
        itemStyle: {
          normal: {
            //这里是重点
            color: function (params) {
              //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
              let colorList = [
                '#898989',
                '#9c9800',
                '#007f54',
                '#a195c5',
                '#103667',
                '#f19272'
              ]
              return colorList[params.dataIndex]
            }
          }
        }
      }
    ]
  }
  mychart.setOption(option)
}

let time = ref('今日')

// 下拉框选项
const options = [
  {
    value: 1,
    label: '今日'
  },
  {
    value: 2,
    label: '昨日'
  },
  {
    value: 7,
    label: '本周'
  },
  {
    value: 30,
    label: '本月'
  },
  {
    value: 90,
    label: '本季度'
  },
  {
    value: 365,
    label: '本年'
  }
]

// 监听数据变化，重绘图表
watch(data, () => {
  initData()
})
// 监听时间变化
watch(time, () => {
  // 选择的时间变化，根据时间重新获取数据
  data.value = props.getData(time.value)
})
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  width: 540px;
  height: 400px;
  .select {
    margin-left: 60%;
    right: 0;
  }
  .charts {
    height: 100%;
  }
}
</style>
