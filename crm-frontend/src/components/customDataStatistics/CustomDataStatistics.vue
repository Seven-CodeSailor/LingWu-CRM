<template>
  <div class="box">
    <el-select v-model="value" class="select" placeholder="请选择时间">
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
  data: {
    type: Object,
    default: () => {
      return {
        title: '数据统计',
        data1: [0, 0, 0],
        data2: [0, 0, 0]
      }
    }
  }
})

let charts = ref()

onMounted(() => {
  initData()
})

let initData = () => {
  let mychart = echarts.init(charts.value)
  //设置配置项
  let option = {
    title: {
      text: props.data.title,
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
        axisLabel: {
          formatter: '{value} 个'
        }
      },
      {
        type: 'value',
        name: '合同金额/万元(人民币)',
        position: 'right',
        min: '0',
        max: `${Math.max(...props.data.data2) || 0}`,
        axisLabel: {
          formatter: '{value} 万元'
        }
      }
    ],
    series: [
      {
        name: '合同数',
        type: 'bar',
        yAxisIndex: 0,
        data: props.data.data1,
        itemStyle: {
          normal: {
            //这里是重点
            color: function (params) {
              //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
              var colorList = ['#c23531', '#61a0a8', '#d48265']
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
        data: props.data.data2,
        itemStyle: {
          normal: {
            //这里是重点
            color: function (params) {
              //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
              var colorList = ['#749f83', '#91c7ae', '#61a0a8']
              return colorList[params.dataIndex]
            }
          }
        }
      }
    ]
  }
  mychart.setOption(option)
}

const value = ref('今日')

const options = [
  {
    value: 'Option0',
    label: '今日'
  },
  {
    value: 'Option1',
    label: '明日'
  },
  {
    value: 'Option2',
    label: '本周内'
  },
  {
    value: 'Option3',
    label: '本月内'
  },
  {
    value: 'Option4',
    label: '本季度内'
  },
  {
    value: 'Option5',
    label: '本年内'
  }
]

// 监听事件变化
watch(value, (newVal, oldVal) => {
  initData()
})
</script>

<style lang="scss" scoped>
.box {
  display: inline-block;
  width: 520px;
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
