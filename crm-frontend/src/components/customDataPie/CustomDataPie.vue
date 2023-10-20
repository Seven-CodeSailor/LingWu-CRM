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
        data1: [''],
        data2: [0]
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
      text: '预计签单客户合同金额',
      left: 'center'
    },
    legend: {
      orient: 'vertical',
      x: 'left',
      data: props.data.data1
    },
    series: [
      {
        type: 'pie',
        radius: ['20%', '40%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        data: [
          { value: props.data.data2[0], name: props.data.data1[0] },
          { value: props.data.data2[1], name: props.data.data1[1] },
          { value: props.data.data2[2], name: props.data.data1[2] },
          { value: props.data.data2[3], name: props.data.data1[3] },
          { value: props.data.data2[4], name: props.data.data1[4] }
        ],
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: '{b}:{c}元 ({d}%)'
            },
            labelLine: {
              show: true
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
    margin-top: 10%;
    height: 100%;
  }
}
</style>
