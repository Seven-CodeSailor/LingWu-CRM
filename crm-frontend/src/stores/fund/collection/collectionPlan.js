/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-31 15:56:56
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-31 21:26:45
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\fund\collection\collectionPlan.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */

import { defineStore } from 'pinia'
import Request from '@/apis/request.js'
export const useCollectionPlan = defineStore('collectionPlan', {
  state: () => ({
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
      usePagination: true
    }
  }),
  getters: {},
  actions: {
    //发请求拿table表的数据
    async getCollectionPlanList(pageSize, pageIndex) {
      const data = await Request.requestJson(
        Request.GET,
        'https://www.fastmock.site/mock/8e32bb7d22d2160aa723642e11594457/api/collectionplans/get-collectionplans',
        {
          pageIndex,
          pageSize
        },
        null
      ).catch((e) => e)
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
