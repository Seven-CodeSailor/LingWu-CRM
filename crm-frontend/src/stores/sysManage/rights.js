import { defineStore } from 'pinia'

const useSysRights = defineStore('sysrights', {
  state: () => ({
    sendData: {
      msg: '一些操作说明',
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
          label: '启用'
        }
      ],
      tableData: [
        {
          caidanmingcheng: '销售管理',
          caidanmiaoshu: '菜单描述',
          shifouqiyong: '启用'
        },
        {
          caidanmingcheng: '我的客户',
          caidanmiaoshu: '菜单描述',
          shifouqiyong: '启用'
        },
        {
          caidanmingcheng: '服务记录',
          caidanmiaoshu: '菜单描述',
          shifouqiyong: '启用'
        }
      ],
      useDropdownMenu: false,
      useSelectColumn: false,
      useHeader: true,
      usePagination: true,
      pageSizes: [2, 10, 15, 200],
      total: 100,
      title: '菜单管理'
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

export default useSysRights
