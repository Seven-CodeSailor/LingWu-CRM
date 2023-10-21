<template>
  <div style="color: red">测试ContractDetails组件</div>
  <el-button @click="get">判断添加附件的按钮是否被点击</el-button>
  <ContractDetails
    :contract-money="sendData.contractMoney"
    :zero-out-money="sendData.zeroOutMoney"
    :due-money="sendData.dueMoney"
    :start-date="sendData.startDate"
    :end-date="sendData.endDate"
    :create-date="sendData.startDate"
    :our-represent="sendData.ourRepresent"
    :contract-title="sendData.contractTitle"
    :contract-id="sendData.contractId"
    :tag-name="sendData.tagName"
    :tag-type="sendData.tagType"
    :data-list1="sendData.dataList1"
    :handle-add-attachment="sendData.handleAddAttachment"
  ></ContractDetails>
</template>

<script setup>
import { provide } from 'vue'
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
  // 添加附件的逻辑处理函数,
  handleAddAttachment: () => {
    console.log('处理一些逻辑')
  },
  // 标签类型 success danger info warning  el(el为element的主题色,且为默认值)
  tagType: 'danger',
  // refundMoney sellerNote customerName customerRepresent 为一组数据
  // 两者二选一
  // 普通合同独有的字段
  dataList1: {
    // 字段属性不能更改
    refundMoney: 800,
    sellerNote: '美丽的卖家备注',
    customerName: '哇哈哈',
    customerRepresent: '圆神'
  },

  // paymentMoney purchaseNote contactRepresent  supplierName为一组数据
  // 采购合同独有的字段
  dataList2: {
    // 字段属性不能更改
    paymentMoney: 333,
    purchaseNote: '采购哈哈哈哈备注',
    contactRepresent: '小黑',
    supplierName: '咩咩咩咩'
  }
}

// 四个tab分别对应的表格
// 传递给ContractDetails组件
// dataList1 的3个表格的prop  label
// 表格的prop和lebel不能变
provide('firstTableInfo', {
  tableColumnAttribute: [
    {
      prop: 'goodsNameAndFeature',
      label: '商品名称/商品规格'
    },
    {
      prop: 'price',
      label: '销售价格'
    },
    {
      prop: 'goodsNumber',
      label: '商品数量'
    },
    {
      prop: 'subtotal',
      label: '小计'
    },
    {
      prop: 'note',
      label: '备注'
    }
  ],
  tableData: [
    {
      goodsNameAndFeature: '',
      goodsName: 'iPhone15',
      goodsFeature: '128G',
      goodsNumber: 90,
      price: 1000,
      subtotal: 10000,
      note: '手机'
    },
    {
      goodsNameAndFeature: '',
      goodsName: 'iPhone15',
      goodsFeature: '128G',
      goodsNumber: 90,
      price: 1000,
      subtotal: 10000,
      note: '手机'
    },
    {
      goodsNameAndFeature: '',
      goodsName: 'iPhone15',
      goodsFeature: '128G',
      goodsNumber: 90,
      price: 1000,
      subtotal: 10000,
      note: '手机'
    }
  ].map((item) => {
    return {
      goodsNameAndFeature: item.goodsName + '/' + item.goodsFeature,
      goodsNumber: item.goodsNumber,
      price: item.price,
      subtotal: item.goodsNumber * item.price,
      note: item.note
    }
  })
})
provide('secondTableInfo', {
  tableColumnAttribute: [
    {
      prop: 'saleContract',
      label: '销售合同'
    },
    {
      prop: 'refundDate',
      label: '回款时间'
    },
    {
      prop: 'frequent',
      label: '期次'
    },
    {
      prop: 'money',
      label: '金额'
    },
    {
      prop: 'zeroOutMoney',
      label: '去零'
    },
    {
      prop: 'creator',
      label: '创建人'
    },
    {
      prop: 'note',
      label: '备注'
    }
  ],
  tableData: [
    {
      saleContract: 'iPhone15',
      refundDate: '2023-3-4',
      frequent: 10000,
      money: 30000,
      zeroOutMoney: 70000,
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      saleContract: 'iPhone15',
      refundDate: '2023-3-4',
      frequent: 10000,
      money: 30000,
      zeroOutMoney: 70000,
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      saleContract: 'iPhone15',
      refundDate: '2023-3-4',
      frequent: 10000,
      money: 30000,
      zeroOutMoney: 70000,
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      saleContract: 'iPhone15',
      refundDate: '2023-3-4',
      frequent: 10000,
      money: 30000,
      zeroOutMoney: 70000,
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      saleContract: 'iPhone15',
      refundDate: '2023-3-4',
      frequent: 10000,
      money: 30000,
      zeroOutMoney: 70000,
      creator: '蔡徐坤',
      note: '手机'
    }
  ]
})

provide('thirdTableInfo', {
  tableColumnAttribute: [
    {
      prop: 'contractId',
      label: '合同单号'
    },
    {
      prop: 'invoiceId',
      label: '编号'
    },
    {
      prop: 'invoiceMoney',
      label: '发票金额'
    },
    {
      prop: 'openTicketDate',
      label: '开票时间',
      sortable: true
    },
    {
      prop: 'frequent',
      label: '期次'
    },
    {
      prop: 'creator',
      label: '创建人'
    },
    {
      prop: 'note',
      label: '备注'
    }
  ],
  tableData: [
    {
      contractId: '123454534',
      idNum: '2323423423423',
      frequent: 10000,
      invoiceMoney: 30000,
      invoiceId: '33333',
      openTicketDate: '2030-9-1',
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      contractId: '123454534',
      idNum: '2323423423423',
      frequent: 10000,
      invoiceMoney: 30000,
      invoiceId: '33333',
      openTicketDate: '2030-9-2',
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      contractId: '123454534',
      idNum: '2323423423423',
      frequent: 10000,
      invoiceMoney: 30000,
      invoiceId: '33333',
      openTicketDate: '2030-9-3',
      creator: '蔡徐坤',
      note: '手机'
    },
    {
      contractId: '123454534',
      idNum: '2323423423423',
      frequent: 10000,
      invoiceMoney: 30000,
      invoiceId: '33333',
      openTicketDate: '2030-9-4',
      creator: '蔡徐坤',
      note: '手机'
    }
  ]
})

//dataList2 的3个表格的prop  label
// 表格的prop和lebel不能变
// provide('firstTableInfo', {
//   tableColumnAttribute: [
//     {
//       prop: 'goodsNameAndFeature',
//       label: '商品名称/商品规格'
//     },
//     {
//       prop: 'price',
//       label: '进货价格'
//     },
//     {
//       prop: 'goodsNumber',
//       label: '商品数量'
//     },
//     {
//       prop: 'subtotal',
//       label: '小计'
//     },
//     {
//       prop: 'note',
//       label: '备注'
//     }
//   ],
//   tableData: [
//     {
//       goodsNameAndFeature: '',
//       price: 800,
//       goodsName: 'iPhone15',
//       goodsFeature: '128G',
//       goodsNumber: 90,
//       subtotal: 10000,
//       note: '手机'
//     },
//     {
//       goodsNameAndFeature: '',
//       price: 800,
//       goodsName: 'iPhone15',
//       goodsFeature: '128G',
//       goodsNumber: 90,
//       subtotal: 10000,
//       note: '手机'
//     },
//     {
//       goodsNameAndFeature: '',
//       price: 800,
//       goodsName: 'iPhone15',
//       goodsFeature: '128G',
//       goodsNumber: 90,
//       subtotal: 10000,
//       note: '手机'
//     }
//   ].map((item) => {
//     return {
//       goodsNameAndFeature: item.goodsName + '/' + item.goodsFeature,
//       price: item.price,
//       goodsNumber: item.goodsNumber,
//       subtotal: item.price * item.goodsNumber,
//       note: item.note
//     }
//   })
// })
// provide('secondTableInfo', {
//   tableColumnAttribute: [
//     {
//       prop: 'supplier',
//       label: '供应商'
//     },
//     {
//       prop: 'purchaseContract',
//       label: '采购合同'
//     },
//     {
//       prop: 'paymentDate',
//       label: '付款时间'
//     },
//     {
//       prop: 'frequent',
//       label: '期次'
//     },
//     {
//       prop: 'money',
//       label: '金额'
//     },
//     {
//       prop: 'zeroOutMoney',
//       label: '去零'
//     },
//     {
//       prop: 'creator',
//       label: '创建人'
//     },
//     {
//       prop: 'createDate',
//       label: '创建时间'
//     },
//     {
//       prop: 'note',
//       label: '备注'
//     }
//   ],
//   tableData: [
//     {
//       supplier: '中国',
//       purchaseContract: 'iPhone15',
//       paymentDate: '2023-3-4',
//       frequent: 10000,
//       money: 30000,
//       zeroOutMoney: 70000,
//       createDate: '2023-3-4',
//       creator: '蔡徐坤',
//       note: '手机'
//     },
//     {
//       supplier: '中国',
//       purchaseContract: 'iPhone15',
//       paymentDate: '2023-3-4',
//       frequent: 10000,
//       money: 30000,
//       zeroOutMoney: 70000,
//       createDate: '2023-3-4',
//       creator: '蔡徐坤',
//       note: '手机'
//     }
//   ]
// })

// provide('thirdTableInfo', {
//   tableColumnAttribute: [
//     {
//       prop: 'supplier',
//       label: '供应商'
//     },
//     {
//       prop: 'contractId',
//       label: '合同单号'
//     },
//     {
//       prop: 'invoiceMoneyAndId',
//       label: '发票金额/编号'
//     },
//     {
//       prop: 'collectTicketDate',
//       label: '收票时间',
//       sortable: true
//     },
//     {
//       prop: 'frequent',
//       label: '期次'
//     },
//     {
//       prop: 'creator',
//       label: '创建人'
//     },
//     {
//       prop: 'note',
//       label: '备注'
//     }
//   ],
//   tableData: [
//     {
//       supplier: 'iPhone15',
//       contractId: '123454534',
//       frequent: 10000,
//       invoiceMoney: 30000,
//       invoiceId: '33333',
//       invoiceMoneyAndId: '',
//       collectTicketDate: '2030-9-1',
//       creator: '蔡徐坤',
//       note: '手机'
//     },
//     {
//       supplier: 'iPhone15',
//       contractId: '123454534',
//       frequent: 10000,
//       invoiceMoney: 30000,
//       invoiceId: '33333',
//       invoiceMoneyAndId: '',
//       collectTicketDate: '2030-9-1',
//       creator: '蔡徐坤',
//       note: '手机'
//     },
//     {
//       supplier: 'iPhone15',
//       contractId: '123454534',
//       frequent: 10000,
//       invoiceMoney: 30000,
//       invoiceId: '33333',
//       invoiceMoneyAndId: '',
//       collectTicketDate: '2030-9-1',
//       creator: '蔡徐坤',
//       note: '手机'
//     },
//     {
//       supplier: 'iPhone15',
//       contractId: '123454534',
//       frequent: 10000,
//       invoiceMoney: 30000,
//       invoiceId: '33333',
//       invoiceMoneyAndId: '',
//       collectTicketDate: '2030-9-1',
//       creator: '蔡徐坤',
//       note: '手机'
//     },
//     {
//       supplier: 'iPhone15',
//       contractId: '123454534',
//       frequent: 10000,
//       invoiceMoney: 30000,
//       invoiceId: '33333',
//       invoiceMoneyAndId: '',
//       collectTicketDate: '2030-9-1',
//       creator: '蔡徐坤',
//       note: '手机'
//     },
//     {
//       supplier: 'iPhone15',
//       contractId: '123454534',
//       frequent: 10000,
//       invoiceMoney: 30000,
//       invoiceId: '33333',
//       invoiceMoneyAndId: '',
//       collectTicketDate: '2030-9-1',
//       creator: '蔡徐坤',
//       note: '手机'
//     }
//   ].map((item) => {
//     return {
//       supplier: item.supplier,
//       contractId: item.contractId,
//       frequent: item.frequent,
//       invoiceMoney: item.invoiceMoney,
//       invoiceId: item.invoiceId,
//       invoiceMoneyAndId: item.invoiceMoney + '/' + item.invoiceId,
//       collectTicketDate: item.collectTicketDate,
//       creator: item.creator,
//       note: item.note
//     }
//   })
// })
// // 第四个表格dataList1 和 dataList2 公用
provide('fourthTableInfo', {
  tableColumnAttribute: [
    {
      prop: 'name',
      label: '名称'
    },
    {
      prop: 'pathPic',
      label: '路径'
    },
    {
      prop: 'pic',
      label: '图片'
    },
    {
      prop: 'note',
      label: '备注'
    }
  ],
  tableData: [
    {
      name: 'iPhone15',
      pathPic: '遥远的她',
      pic: 'https://cdn2.thecatapi.com/images/9j5.jpg',
      invoiceMoney: 30000,
      note: '手机'
    }
  ]
})
</script>

<style lang="scss" scoped></style>
