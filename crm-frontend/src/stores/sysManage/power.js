import { defineStore } from 'pinia'

const useSysPower = defineStore('syspower', {
  state: () => ({
    sendData: {
      tableColumnAttribute: [
        {
          prop: 'mingcheng',
          label: '权限名称'
        },
        {
          prop: 'miaoshu',
          label: '权限描述'
        }
      ],
      tableData: [
        {
          mingcheng: '系统管理',
          miaoshu: '系统描述'
        },
        {
          mingcheng: '权限1',
          miaoshu: 'qwq'
        },
        {
          mingcheng: '权限2',
          miaoshu: 'qwq'
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

export default useSysPower
