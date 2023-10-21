<template>
  <div class="contract_details">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <!-- 面包屑 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in $route.matched"
              :to="{ path: item.path }"
              :key="index"
              >{{ item.meta.text }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <el-button @click="$router.go(-1)"
            ><el-icon style="margin-right: 4px"><icon-back /></el-icon
            >返回</el-button
          >
        </div>
      </template>
      <div class="data">
        <div class="left">
          <div class="top">
            <h3 style="font-weight: 700">
              合同标题：{{ props.contractTitle }}
            </h3>
          </div>
          <el-divider />
          <div class="content">
            <div class="item">
              合同编号：
              {{ props.contractId }}
            </div>
            <div class="item">合同金额：{{ props.contractMoney }}</div>
            <div class="item">去零金额：{{ props.zeroOutMoney }}</div>
            <div class="item">
              {{
                props.dataList1.refundMoney
                  ? `回款金额：${props.dataList1.refundMoney}`
                  : `付款金额：${props.dataList2.paymentMoney}`
              }}
            </div>
            <div class="item">欠款金额：{{ props.dueMoney }}</div>
            <div class="item">开始时间：{{ props.startDate }}</div>
            <div class="item">结束时间：{{ props.endDate }}</div>
            <div class="item">
              {{
                props.dataList1.sellerNote
                  ? `卖家备注：${props.dataList1.sellerNote}`
                  : `采购备注：${props.dataList2.purchaseNote}`
              }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <h3 style="font-weight: 700; margin-right: 90px">
              <el-tag :type="props.tagType">{{ props.tagName }}</el-tag>
            </h3>
          </div>
          <el-divider />
          <div class="content">
            <div>创建时间：{{ props.createDate }}</div>
            <div>
              {{
                props.dataList1.customerName
                  ? `客户名称：${props.dataList1.customerName}`
                  : `供应商名称：${props.dataList2.supplierName}`
              }}
            </div>
            <div>
              {{
                props.dataList1.customerRepresent
                  ? `客户代表：${props.dataList1.customerRepresent}`
                  : `联系代表：${props.dataList2.contactRepresent}`
              }}
            </div>
            <div>我方代表：{{ props.ourRepresent }}</div>
          </div>
        </div>
      </div>
      <!-- tab切换区 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :label="props.dataList1.customerName ? '合同明细' : '采购明细'"
          name="first"
        >
          <BaseDataList
            :use-operate-column="false"
            :use-select-column="false"
            :use-header="false"
            :use-pagination="false"
            :table-column-attribute="firstTableInfo.tableColumnAttribute"
            :table-data="firstTableInfo.tableData"
          ></BaseDataList>
          <div
            style="
              margin-top: 12px;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: right;
            "
          >
            <div style="margin: 0 10px; font-weight: 700">
              数量合计：<span style="font-size: 12px"
                >{{ firstTableTotalGoodsNumber }}件</span
              >
            </div>
            <div style="font-weight: 700">
              金额合计：<span style="color: red; font-size: 12px"
                >￥{{ firstTableTotalMoney }}元</span
              >
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="props.dataList1.customerName ? '回款记录' : '付款记录'"
          name="second"
        >
          <BaseDataList
            :use-operate-column="false"
            :use-select-column="false"
            :use-header="false"
            :use-pagination="false"
            :table-column-attribute="secondTableInfo.tableColumnAttribute"
            :table-data="secondTableInfo.tableData"
          ></BaseDataList>
          <div
            style="
              text-align: right;
              margin-top: 12px;
              font-weight: 700;
              font-size: 12px;
            "
          >
            金额合计：<span style="color: red; font-size: 12px"
              >￥{{ secondTableTotalMoney }}元</span
            >
          </div></el-tab-pane
        >
        <el-tab-pane
          :label="props.dataList1.customerName ? '发票记录' : '收票记录'"
          name="third"
        >
          <BaseDataList
            :use-operate-column="false"
            :use-select-column="false"
            :use-header="false"
            :use-pagination="false"
            :table-column-attribute="thirdTableInfo.tableColumnAttribute"
            :table-data="thirdTableInfo.tableData"
          ></BaseDataList>
          <div
            style="
              text-align: right;
              margin-top: 12px;
              font-weight: 700;
              font-size: 12px;
            "
          >
            金额合计：<span style="color: red; font-size: 12px"
              >￥{{ thirdTableTotalMoney }}元</span
            >
          </div></el-tab-pane
        >
        <el-tab-pane label="合同附件" name="fourth">
          <el-table :data="fourthTableInfo.tableData" style="width: 100%">
            <el-table-column
              v-for="(item, index) in fourthTableInfo.tableColumnAttribute"
              :key="index"
              :prop="item.prop"
              :label="item.label"
            >
              <template #default="{ row }" v-if="item.prop === 'pic'">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="row[item.prop]"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin-top: 10px"
            >添加附件</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import BaseDataList from './BaseDataList.vue'
const activeName = ref('first')
const props = defineProps({
  contractMoney: {
    type: Number,
    require: true,
    default: -9999
  },
  zeroOutMoney: {
    type: Number,
    require: true,
    default: -9999
  },
  dueMoney: {
    type: Number,
    require: true,
    default: -9999
  },
  startDate: {
    type: String,
    require: true,
    default: '未传数据'
  },
  endDate: {
    type: String,
    require: true,
    default: '未传数据'
  },
  createDate: {
    type: String,
    require: true,
    default: '未传数据'
  },
  ourRepresent: {
    type: String,
    require: true,
    default: '未传数据'
  },
  tagName: {
    type: String,
    require: true,
    default: '未传数据'
  },
  tagType: {
    type: String,
    require: true,
    default: 'el',
    // 标签类型校验
    validator: (tagType) => {
      return (
        ['success', 'warning', 'danger', 'info', 'el'].indexOf(tagType) !== -1
      )
    }
  },
  // 合同标题
  contractTitle: {
    type: String,
    default: '未传数据'
  },
  // 合同编号
  contractId: {
    type: String,
    default: '未传数据'
  },
  // 普通合同独有的字段
  dataList1: {
    type: Object,
    default: () => {
      return {
        refundMoney: '',
        sellerNote: '',
        customerName: '',
        customerRepresent: ''
      }
    }
  },
  // 采购合同独有的字段
  dataList2: {
    type: Object,
    default: () => {
      return {
        paymentMoney: '',
        purchaseNote: '',
        contactRepresent: '',
        supplierName: ''
      }
    }
  }
})
const handleClick = (tab, event) => {
  console.log(tab, event)
}

// 根据四个tab分别对应的表格数据
// 第一个tab所对应的表格
const firstTableInfo = inject('firstTableInfo')

const firstTableTotalMoney = computed(() => {
  let money = 0
  firstTableInfo.tableData.forEach((item) => {
    money += item.price * item.goodsNumber
  })
  return money
})

const firstTableTotalGoodsNumber = computed(() => {
  let number = 0
  firstTableInfo.tableData.forEach((item) => {
    number += item.goodsNumber
  })
  return number
})
// 第二个tab
const secondTableInfo = inject('secondTableInfo')

const secondTableTotalMoney = computed(() => {
  let money = 0
  secondTableInfo.tableData.forEach((item) => {
    money += item.money
  })
  return money
})
// 第三个tab
const thirdTableInfo = inject('thirdTableInfo')

const thirdTableTotalMoney = computed(() => {
  let money = 0
  thirdTableInfo.tableData.forEach((item) => {
    money += item.invoiceMoney
  })
  return money
})

// 第四个tab
const fourthTableInfo = inject('fourthTableInfo')
</script>

<style lang="scss" scoped>
.contract_details {
  .box-card {
    height: 100%;

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .data {
      height: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        width: 49%;
        height: 100%;

        .top {
          height: 12%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .content {
          .item {
            margin: 10px 0;
          }
        }
      }

      .right {
        width: 49%;
        height: 100%;

        .top {
          height: 12%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .content {
          div {
            margin: 10px 0;
          }
        }
      }
    }
  }
}

:deep(.el-card__body) {
  height: 60%;
}

:deep(.el-divider--horizontal) {
  margin: 10px 0;
}
:deep(.el-table__header) {
  width: 100%;
}
</style>
