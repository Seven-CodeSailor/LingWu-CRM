/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 13:05:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-30 18:39:39
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\sysManage\field.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'

const useSysField = defineStore('sysfield', {
  state: () => ({
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'tishiwenzi',
          label: '表单提示文字'
        },
        {
          prop: 'ziduanmingcheng',
          label: '字段名称'
        },
        {
          prop: 'leixing',
          label: '类型'
        },
        {
          prop: 'morenzhi',
          label: '默认值'
        },
        {
          prop: 'zuidazhi',
          label: '最大值'
        },
        {
          prop: 'shifouqiyong',
          label: '是否启用'
        },
        {
          prop: 'data',
          label: '必填',
          useTag: true
        }
      ],
      tableData: [
        {
          tishiwenzi: '客户代表',
          ziduanmingcheng: 'linkman',
          leixing: '单行文本',
          morenzhi: 'default',
          zuidazhi: '100',
          shifouqiyong: '是',
          data: {
            value: '是',
            tagType: 'success'
          }
        }
      ],

      useDropdownMenu: false,
      useSelectColumn: false,
      useHeader: false,
      usePagination: true,
      pageSizes: [2, 10, 15, 200],
      total: 100,
      //放在旁边
      title: ''
    },
    sendSideData: ['客户信息', '客户联系人', '供应商信息', '供应商联系人'],
    sendSelectData: ['单行文本', '多行文本']
  }),

  actions: {
    setSysTable(data) {
      console.log('data-in-pinia', data)
    },
    init() {
      console.log('发请求拿数据')
    }
  }
})

export default useSysField
