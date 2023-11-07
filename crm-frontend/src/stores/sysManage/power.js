import { defineStore } from 'pinia'
import { getPowerList } from '@/apis/sysManage/power.js'
const useSysPower = defineStore('syspower', {
  state: () => ({
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'name',
          label: '权限名称'
        },
        {
          prop: 'value',
          label: '权限描述'
        }
      ],
      tableData: [],
      useDropdownMenu: false,
      useSelectColumn: false,
      useHeader: false,
      usePagination: true,
      pageSizes: [2, 10, 15, 30],
      total: 10,
      //在树形菜单里显示
      title: ''
    },
    sendTreeData: [
      {
        id: 1,
        label: '管理员',
        children: [
          {
            id: 4,
            label: '系统管理',
            children: [
              {
                id: 9,
                label: '权限1'
              },
              {
                id: 10,
                label: '权限2'
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
    ],
    pageParams: {
      pageIndex: '',
      pageSize: ''
    }
  }),

  actions: {
    async getPowerList(pageParams, searchData) {
      const res = await getPowerList(pageParams, searchData).catch((e) => e)
      console.log('res', res)
      this.sendData.tableData = res.data.rows
      this.sendData.total = res.data.total
    }
  }
})

export default useSysPower
