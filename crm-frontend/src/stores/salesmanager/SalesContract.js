/*
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-11-01 23:08:00
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-11-01 23:09:05
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\sales-manager\SalesContract.js
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { querySalesContractData } from '@/apis/publicInterface.js'

/**
 * 获取销售合同列表的仓库
 */
export const useSalesContractStore = defineStore('salescontract', () => {
  // 表格数据
  const tableData = ref([])
  // 数据总计
  const tableTotal = ref(100)
  // const pageSize = ref(5)
  // 获取表格数据的方法
  const getTableData = async (params) => {
    await querySalesContractData(params)
      .then((res) => {
        console.log('res的值', res)
        // console.log('5')
        const rows = res.data.data

        tableData.value = rows.map((item) => {
          return {
            id: item.id,
            contract_no: item.contract_no,
            title: item.title,
            customer_id: item.customer_id,
            money: item.money,
            start_date: item.start_date,
            end_date: item.end_date,
            status: {
              value: item.status,
              tagType: 'warning'
            },
            back_money: item.back_money,
            zero_money: item.zero_money,
            owe_money: item.owe_money,
            back_status: item.back_status,
            back_money_status: `回款：${item.back_money}\n去零： ${item.zero_money}\n欠款： ${item.owe_money}\n状态：${item.back_status}`,
            deliver_money: item.deliver_money,
            invoice_money: item.invoice_money,
            invoice_status: {
              value: item.invoice_status,
              tagType: 'success'
            },
            deliver_money_status: `开票： ${item.deliver_money}\n状态：${item.invoice_status}`
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return {
    getTableData,
    tableData,
    tableTotal
  }
})
