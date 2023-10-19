<!-- 销售管理 数量统计 -->
<template>
  <!-- 销售管理的div标签 -->
  <div class="salesKit">
    <el-row>
    <el-select class="chartCheckBox" v-model="value" placeholder="请选择">
     <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-row>
  <div id="MyChart" class="chart"></div>
  </div>
</template>

<script setup>
// 局部引入echarts
import * as echarts from "echarts"
import { onMounted } from 'vue';
  // 下拉选择框选项
  const options = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
  // 挂载时显示图表
  onMounted(() => {
    // 初始化图表
    let myEchart = echarts.init(document.getElementById('MyChart'))
    myEchart.setOption({
      // 主标题设置
      title: {
        // 主标题文本
        text: '销售简报-新增数据统计'
      },
      legend: {
        show: true
      },
      // x轴
      xAxis: {
        type: 'category',
        // 数据
        data: ['EZ', 'VN', 'NOC', 'MF', 'HELLO'],

      
        axisLabel: {
          interale: 0,
          // formatter: function (value) {//在这里写你需要的时间格式
          //       var t_date = new Date(value);
          //       return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('-')
          //       // + " " + [t_date.getHours(), t_date.getMinutes()].join(':'); 时分
          //   }
        }
      },
      // y轴
      yAxis: [
        // 左侧Y轴
        {
          type: 'value',
          name: '个数',
          // 刻度标签
          axisLabel: {
            show: true,
            // 单位以及刻度位置
            formatter: '{value} 个',
            align: 'outSide'
          },
          data: [0, 30, 60, 90, 120, 150]
        },
        // 右侧Y轴
        {
          type: 'value',
          name: '元(人民币)',
          // 刻度标签
          axisLabel: {
            show: true,
            // 单位以及刻度位置
            formatter: '{value} 元',
            align: 'outSide'
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
    })
  })
</script>

<style  scoped>
.salesKit{
  width: 1000px;
  height: 600px;
}
/* 图标样式 */
.chart{
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 100px;
  width: 600px;
  height: 600px;
}
.chartCheckBox{
  margin-left: 450px;
}
</style>