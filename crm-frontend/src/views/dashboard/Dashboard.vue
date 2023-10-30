<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-19 22:34:52
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-19 22:35:03
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\dashboard\Dashboard.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->
<template>
  <el-card style="width: 100%">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="系统公告" name="first">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="el-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size: 24px">系统公告</span>
                </div>
              </template>
              <section></section>
            </el-card>
          </el-col>
        </el-row>
        <el-space wrap> </el-space>
      </el-tab-pane>
      <el-tab-pane label="提醒消息" name="second">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="el-card">
              <template #header>
                <div class="card-header">
                  <span style="font-size: 24px">提醒消息</span>
                </div>
              </template>
              <section></section>
            </el-card>
          </el-col>
        </el-row>
        <el-space wrap> </el-space>
      </el-tab-pane>
      <el-tab-pane label="我的客户统计信息" name="third">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card class="el-card">
              <div class="box">
                <!-- <CustomDataStatistics :getData="getData"></CustomDataStatistics> -->
                <el-select
                  v-model="time"
                  class="select"
                  placeholder="请选择时间"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <div class="charts" ref="charts"></div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="我的商机统计信息" name="fouth">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card>
              <div class="box">
                <CustomDataPie :getData="getDatas"></CustomDataPie>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
// import CustomDataStatistics from '@/components/customDataStatistics/CustomDataStatistics.vue'
import CustomDataPie from '@/components/customDataPie/CustomDataPie.vue'
import useDashBoard from '@/stores/dashBoard/dashBoard.js'
import { getOpportunityChartsData } from '@/apis/dashBoard/dashBoard.js'

const dashBoard = useDashBoard()
const activeName = ref('first')

let charts = ref()

const getData = async () => {
  await getOpportunityChartsData()
}

onMounted(() => {
  getData()
  initData()
})

let data = ref({
  title: '数据统计',
  x: ['我的客户', '下属客户', '公海客户'],
  contractsNumber: [0, 0, 0],
  amount: [0, 0, 0]
})
// 初始化数据列表
let initData = () => {
  console.log(dashBoard.data)
  let mychart = echarts.init(charts.value)
  //设置配置项
  // let option = {
  //   title: {
  //     text: dashBoard.data.title,
  //     show: true
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: { type: 'cross' }
  //   },
  //   xAxis: {
  //     type: 'category',
  //     axisTick: {
  //       alignWithLabel: true
  //     },
  //     data: dashBoard.data.x
  //   },
  //   yAxis: [
  //     {
  //       type: 'value',
  //       name: '合同个数',
  //       position: 'left',
  //       minInterval: 1,
  //       axisLabel: {
  //         formatter: '{value} 个'
  //       }
  //     },
  //     {
  //       type: 'value',
  //       name: '合同金额/万元(人民币)',
  //       position: 'right',
  //       min: '0',
  //       max: `${Math.max(...dashBoard.data.amount) || 0}`,
  //       axisLabel: {
  //         formatter: '{value} 万'
  //       }
  //     }
  //   ],
  //   series: [
  //     {
  //       name: '合同数',
  //       type: 'bar',
  //       yAxisIndex: 0,
  //       data: dashBoard.data.contractsNumber,
  //       itemStyle: {
  //         normal: {
  //           //这里是重点
  //           color: function (params) {
  //             //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
  //             let colorList = [
  //               '#194f97',
  //               '#555555',
  //               '#bd6b08',
  //               '#00686b',
  //               '#c82d31',
  //               '#625ba1'
  //             ]
  //             return colorList[params.dataIndex]
  //           }
  //         }
  //       }
  //     },
  //     {
  //       name: '金额数',
  //       type: 'bar',
  //       smooth: true,
  //       yAxisIndex: 0,
  //       data: dashBoard.data.amount,
  //       itemStyle: {
  //         normal: {
  //           //这里是重点
  //           color: function (params) {
  //             //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
  //             let colorList = [
  //               '#898989',
  //               '#9c9800',
  //               '#007f54',
  //               '#a195c5',
  //               '#103667',
  //               '#f19272'
  //             ]
  //             return colorList[params.dataIndex]
  //           }
  //         }
  //       }
  //     }
  //   ]
  // }
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    legend: {
      data: ['Growth', 'Budget 2011', 'Budget 2012'],
      itemGap: 5
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.value.x
      }
    ],
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
    // dataZoom: [
    //   {
    //     show: true,
    //     start: 94,
    //     end: 100
    //   },
    //   {
    //     type: 'inside',
    //     start: 94,
    //     end: 100
    //   },
    //   {
    //     show: true,
    //     yAxisIndex: 0,
    //     filterMode: 'empty',
    //     width: 30,
    //     height: '80%',
    //     showDataShadow: false,
    //     left: '93%'
    //   }
    // ],
    series: [
      {
        name: 'Budget 2011',
        type: 'bar',
        data: data.value.contractsNumber
      },
      {
        name: 'Budget 2012',
        type: 'bar',
        data: data.value.amount
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
watch(data.value, () => {
  initData()
})
// 监听时间变化
watch(time, () => {
  // 选择的时间变化，根据时间重新获取数据
  getData(time.value)
})
</script>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  margin-right: 20px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.box {
  display: inline-block;
  width: 100%;
  height: 500px;
  .select {
    margin-left: 60%;
    right: 0;
  }
  .charts {
    height: 100%;
  }
}
</style>
