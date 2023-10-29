/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 13:05:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-29 13:17:56
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\sysManage\field.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'

const useSysField = defineStore('sysfield', {
  state: () => ({ sendData: {} }),

  actions: {
    getSysTable() {
      return []
    },
    //通过调用此函数改变store数据
    setSysTable(data) {
      console.log('data-in-pinia', data)
    },
    //未来在这里发请求
    init() {
      this.sendData = {
        msg: '一些操作说明',
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
            prop: 'paixu',
            label: '排序'
          },
          {
            prop: 'shifouqiyong',
            label: '是否启用'
          },
          {
            prop: 'data',
            label: '必填',
            useTag: true
          },
          {
            prop: 'caozuo',
            label: '操作'
          }
        ],
        tableData: [
          {
            tishiwenzi: '客户代表',
            ziduanmingcheng: 'linkman',
            leixing: '单行文本',
            morenzhi: 'default',
            zuidazhi: '100',
            paixu: '1',
            shifouqiyong: '是',
            data: {
              // value 和 tagType字段不能改变
              value: '是',
              tagType: 'success'
            },
            caozuo: '操作'
          }
        ],
        handleEdit: (row) => {
          console.log('编辑', row)
        },
        useDropdownMenu: false,
        pageSizes: [2, 10, 15, 200],
        // total 表格的总数据量     total传入数据 和 usePagination为true 才能显示分页
        total: 100,
        // 是否使用分页
        usePagination: false,
        // 是否使用el-card的header
        useHeader: true,
        // 是否使用使用多选列
        useSelectColumn: true,
        // 是否使用操作列
        useOperateColumn: true
      }
    }
  }
})

export default useSysField
