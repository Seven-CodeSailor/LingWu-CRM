/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 13:05:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-09 21:53:08
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\sysManage\menu.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { getSysMenuTree, getMenuList } from '@/apis/sysManage/menu.js'
const useSysMenu = defineStore('sysmenu', {
  state: () => ({
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'name',
          label: '菜单名称'
        },
        {
          prop: 'url',
          label: '菜单路径'
        },
        {
          prop: 'shifouqiyong',
          label: '启用',
          useSwitch: true
        }
      ],
      tableData: [],
      useDropdownMenu: false,
      useSelectColumn: false,
      useHeader: false,
      usePagination: true,
      pageSizes: [2, 10, 15, 200],
      total: 100,
      //在树形菜单里显示
      title: ''
    },
    sendTreeData: []
  }),

  actions: {
    //通过调用此函数改变store数据
    async getSysMenuTree() {
      const res = await getSysMenuTree().catch((e) => e)
      console.log(res.data)
      res.data.name = '菜单管理'
      this.sendTreeData = [res.data]
      console.log('sendTreeData', this.sendTreeData)
    },
    async getMenuList(id) {
      const res = await getMenuList(id).catch((e) => e)
      console.log('res', res)
      this.sendData.tableData = res.data
      console.log('res.data', res.data)
    }
  }
})

export default useSysMenu
