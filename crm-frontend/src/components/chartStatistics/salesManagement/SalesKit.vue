/** @Author: seven * @Date: 2023-10-19 23:51:18 * @Last Modified by: seven *
@Last Modified time: 2023-10-20 11:03:15 **/

<!-- 销售管理 数量统计 -->

<template>
  <!-- 销售管理的div标签 -->
  <div class="salesKit">
    <el-row>
      <el-select
        class="chartCheckBox"
        v-model="value"
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
    <div id="MyChart" class="chart"></div>
  </div>
</template>

<script setup>
// 局部引入echarts
import * as echarts from 'echarts'
import { onMounted, reactive } from 'vue'
// 下拉选择框选项
const options = [
  {
    value: 'option0',
    label: '今日'
  },
  {
    value: 'option1',
    label: '明日'
  },
  {
    value: 'option2',
    label: '本周内'
  },
  {
    value: 'option3',
    label: '本月内'
  },
  {
    value: 'option4',
    label: '本季度内'
  },
  {
    value: 'option5',
    label: '本年内'
  }
]
const dataList = reactive([0, 30, 60, 90, 120, 150])
// 挂载时显示图表
onMounted(() => {
  // 初始化图表
  var myEchart = echarts.init(document.getElementById('MyChart'))

  var option = {
    // color可以控制图标颜色，后面跟数组
    color: ['green', 'blue'],
    // toolbox 工具箱组件
    toolbox: {
      show: true
    },
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
      }
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
        },
        data: dataList
      },
      // 右侧Y轴
      {
        type: 'value',
        // 刻度线与两侧的距离
        boundaryGap: ['20%', '20%'],
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
        },
        data: [0, 100000, 200000, 300000, 400000, 500000]
      }
    ],
    // 系列
    series: [
      {
        name: '数量',
        // bar 表示是柱状图
        type: 'bar',
        barWidth: '10%',
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 10
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: [25, 43, 63, 58, 89]
      },
      {
        name: '数量',
        // bar 表示是柱状图
        type: 'bar',
        barWidth: '10%',
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 10,
          color: 'red'
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: [25, 43, 63, 58, 89]
      },
      {
        name: '数量',
        // bar 表示是柱状图
        type: 'bar',
        barWidth: '10%',
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 10,
          color: 'blue'
        },
        yAxisIndex: 0,
        // 对应轴线的数据
        data: [25, 43, 63, 58, 89]
      },
      {
        name: '金额',
        // bar 表示是柱状图
        type: 'line',
        yAxisIndex: 1,
        // 对应轴线的数据
        data: [250000, 420000, 230000, 580000, 130000]
      }
    ]
  }

  myEchart.setOption(option)
})
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
  margin-left: 1000px;
}
</style>
