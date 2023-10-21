<template>
  <div style="color: red">测试ContractDetails组件</div>
  <ContractDetails
    :contract-money="sendData.contractMoney"
    :zero-out-money="sendData.zeroOutMoney"
    :due-money="sendData.dueMoney"
    :start-date="sendData.startDate"
    :end-date="sendData.endDate"
    :create-date="sendData.startDate"
    :our-represent="sendData.ourRepresent"
    :refund-money="sendData.refundMoney"
    :contract-title="sendData.contractTitle"
    :seller-note="sendData.sellerNote"
    :customer-name="sendData.customerName"
    :customer-represent="sendData.customerRepresent"
    :contract-id="sendData.contractId"
    :tag-name="sendData.tagName"
    :tag-type="sendData.tagType"
    :data-list1="sendData.dataList1"
  ></ContractDetails>
</template>

<script setup>
import ContractDetails from '@/components/DataList/ContractDetails.vue'

const sendData = {
  // 合同金额
  contractMoney: 1000,
  // 去零金额
  zeroOutMoney: 9999,
  // 欠款金额
  dueMoney: 100,
  // 开始时间
  startDate: '2015-1-1',
  // 结束时间
  endDate: '2015-1-2',
  // 创建时间
  createDate: '2015-2-3',
  // 我方代表
  ourRepresent: '蔡徐坤',
  // 合同标题
  contractTitle: '好帅的合同标题',
  // 合同id
  contractId: '12345678',
  // 合同标签
  tagName: '合同的标签',
  // 标签类型 success danger info warning  el(el为element的主题色)
  tagType: 'danger',
  // refundMoney sellerNote customerName customerRepresent 为一组数据
  // 普通合同独有的字段
  dataList1: {
    refundMoney: 800,
    sellerNote: '美丽的卖家备注',
    customerName: '哇哈哈',
    customerRepresent: '圆神'
  },

  // paymentMoney purchaseNote contactRepresent  supplierName为一组数据
  // 采购合同独有的字段
  dataList2: {
    paymentMoney: 333,
    purchaseNote: '采购哈哈哈哈备注',
    contactRepresent: '小黑',
    supplierName: '咩咩咩咩'
  }
}
</script>

<style lang="scss" scoped></style>
