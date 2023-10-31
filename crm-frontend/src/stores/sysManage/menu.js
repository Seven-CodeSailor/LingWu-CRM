/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 13:05:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-30 17:27:25
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\sysManage\menu.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'

const useSysMenu = defineStore('sysmenu', {
  state: () => ({
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'caidanmingcheng',
          label: '销售管理'
        },
        {
          prop: 'caidanmiaoshu',
          label: '菜单描述'
        },
        {
          prop: 'shifouqiyong',
          label: '启用',
          useSwitch: true
        }
      ],
      tableData: [
        {
          caidanmingcheng: '销售管理',
          caidanmiaoshu: '菜单描述',
          shifouqiyong: ''
        },
        {
          caidanmingcheng: '我的客户',
          caidanmiaoshu: '菜单描述',
          shifouqiyong: ''
        },
        {
          caidanmingcheng: '服务记录',
          caidanmiaoshu: '菜单描述',
          shifouqiyong: ''
        }
      ],
      useDropdownMenu: false,
      useSelectColumn: false,
      useHeader: false,
      usePagination: true,
      pageSizes: [2, 10, 15, 200],
      total: 100,
      //在树形菜单里显示
      title: ''
    },
    sendTreeData: [
      {
        id: 1,
        label: '客户管理',
        children: [
          {
            id: 4,
            label: '销售管理',
            children: [
              {
                id: 9,
                label: '我的客户'
              },
              {
                id: 10,
                label: '下属客户'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: 'Level one 2',
        children: [
          {
            id: 5,
            label: 'Level two 2-1'
          },
          {
            id: 6,
            label: 'Level two 2-2'
          }
        ]
      },
      {
        id: 3,
        label: 'Level one 3',
        children: [
          {
            id: 7,
            label: 'Level two 3-1'
          },
          {
            id: 8,
            label: 'Level two 3-2'
          }
        ]
      }
    ]
  }),

  actions: {
    //通过调用此函数改变store数据
    setSysMenu(data) {
      console.log('data-in-pinia', data)
    },
    //未来在这里发请求
    init() {
      console.log('发请求拿数据')
    }
  }
})

export default useSysMenu
