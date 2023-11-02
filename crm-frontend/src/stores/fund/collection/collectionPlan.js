/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-31 15:56:56
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-02 11:43:16
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\fund\collection\collectionPlan.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */

import { defineStore } from 'pinia'
import { getCollectionPlanList } from '@/apis/fund/collectionPlan/index.js'
export const useCollectionPlan = defineStore('collectionPlan', {
  state: () => ({
    clientNameList: ['sayoriqwq', 'sayori'],
    saleContractList: ['合同1', '合同2'],
    payAccountList: ['账户1', '账户2'],
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'id',
          label: '订单编号'
        },
        {
          prop: 'name',
          label: '客户名称'
        },
        {
          prop: 'contract',
          label: '销售合同'
        },
        {
          prop: 'backdate',
          label: '计划时间'
        },
        {
          prop: 'stages',
          label: '期次'
        },
        {
          prop: 'money',
          label: '金额'
        },
        {
          prop: 'data',
          label: '是否回款',
          useTag: true
        }
      ],
      tableData: [],
      useHeader: false,
      usePagination: true,
      pageSizes: [2, 4, 6, 10],
      total: 10,
      useDropdownMenu: true
    }
  }),
  getters: {},
  actions: {
    //发请求拿table表的数据
    async getCollectionPlanList(pageParams) {
      const data = await getCollectionPlanList(pageParams).catch((e) => {
        ElMessage.warn(e.message)
      })
      if (!data.data) return
      this.sendData.tableData = data.data.rows
      //处理tag列数据
      this.sendData.tableData.map((item) => {
        item.weather === '已回款'
          ? (item.data = {
              value: '已回款',
              tagType: 'success'
            })
          : (item.data = {
              value: '未回款',
              tagType: 'danger'
            })
      })
      this.sendData.tableData = data.data.rows
    }
  }
})
