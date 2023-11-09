/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 13:05:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-09 23:23:28
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\sysManage\menu.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import {
  getSysMenuTree,
  getMenuList,
  addMenu,
  updateMenu,
  deleteMenu
} from '@/apis/sysManage/menu.js'
const useSysMenu = defineStore('sysmenu', {
  state: () => ({
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'name',
          label: '菜单名称'
        },
        {
          prop: 'nameEn',
          label: '菜单英文名称'
        },
        {
          prop: 'url',
          label: '菜单路径'
        }
        // {
        //   prop: 'shifouqiyong',
        //   label: '启用',
        //   useSwitch: true
        // }
      ],
      tableData: [],
      useDropdownMenu: false,
      useSelectColumn: false,
      useHeader: false,
      usePagination: false,
      //在树形菜单里显示
      title: ''
    },
    sendTreeData: [],
    parentids: []
  }),

  actions: {
    //通过调用此函数改变store数据
    async getSysMenuTree() {
      const res = await getSysMenuTree().catch((e) => e)
      console.log(res.data)
      res.data.name = '菜单管理'
      //后端没做这个的id和name，但是我认为这里这个层级关系还是应该保留的，为了防止传undefined请求错误后堵塞后面发请求，这里随便给了一个id
      res.data.id = 1
      this.sendTreeData = [res.data]
      console.log('sendTreeData', this.sendTreeData)
    },
    async getMenuList(id) {
      const res = await getMenuList(id).catch((e) => e)
      this.sendData.tableData = res.data
    },
    async getDropMenu(id) {
      const res = await getMenuList(id).catch((e) => e)
      this.sendData.parentids = res.data
    },
    async addMenu(data) {
      const res = await addMenu(data)
      return res
    },
    async updateMenu(data) {
      const res = await updateMenu(data)
      return res
    },
    async deleteMenu(id) {
      const res = await deleteMenu(id)
      return res
    }
  }
})

export default useSysMenu
