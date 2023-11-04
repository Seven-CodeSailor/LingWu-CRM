/*
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-11-03 15:44:58
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-11-03 15:45:00
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\fund\paymentrecords\paymentRecords.js
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { queryPaymentRecordsList } from '@/apis/fund/payment/paymentrecords/index.js'

/**
 * 获取销售合同列表的仓库
 */
export const usePaymentRecordsStore = defineStore('paymentrecords', () => {
  // 表格数据
  const tableData = ref([])
  // 数据总计
  const tableTotal = ref(100)
  //

  //合同金额总计
  const money = computed(() => {
    let money = 0
    tableData.value.forEach((item) => {
      money += item.money
    })
    return money
  })
  //回款金额总计
  const back_money = computed(() => {
    let back_money = 0
    tableData.value.forEach((item) => {
      back_money += item.back_money
    })
    return back_money
  })
  //回款金额总计
  const owe_money = computed(() => {
    let owe_money = 0
    tableData.value.forEach((item) => {
      owe_money += item.owe_money
    })
    return owe_money
  })
  // 页面数据量
  const pageSize = ref(5)
  // 获取表格数据的方法
  const getTableData = async (params) => {
    await queryPaymentRecordsList(params)
      .then((res) => {
        console.log('res的值', res)
        console.log('5')
        const rows = res.data.data
        tableData.value = rows
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return {
    getTableData,
    tableData,
    tableTotal,
    money
  }
})
