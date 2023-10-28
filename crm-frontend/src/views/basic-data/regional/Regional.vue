<template>
  <div class="Regional">
    <div>地区管理</div>
    <div>
      <organization-structure
        :sendData="sendData"
        :treeData="treeData"
      ></organization-structure>
    </div>
  </div>
</template>

<script setup>
import organizationStructure from '@/components/OrganizationStructure/index.vue'
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'areaName',
      label: '地区名称'
    },
    {
      prop: 'areaInfo',
      label: '地区描述'
    },
    {
      prop: 'sort',
      label: '排序',
      sortable: true
    },
    {
      prop: 'isUse',
      label: '是否启用'
    }
  ],
  tableData: [
    {
      areaName: '鸡场',
      areaInfo: 'ikun集中营',
      sort: 250,
      isUse: true
    },
    {
      areaName: '鸡场',
      areaInfo: 'ikun集中营',
      sort: 251,
      isUse: true
    },
    {
      areaName: '鸡场',
      areaInfo: 'ikun集中营',
      sort: 252,
      isUse: true
    }
  ],
  // 传入删除操作的函数就会显示删除按钮
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  pageSizes: [5, 10, 15],
  total: 100,
  usePagination: true
}

const treeData = {
  treeArr: [
    {
      label: 'Level one 1',
      children: [
        {
          label: 'Level two 1-1',
          children: [
            {
              label: 'Level three 1-1-1'
            }
          ]
        }
      ]
    },
    {
      label: 'Level one 2',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1'
            }
          ]
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1'
            }
          ]
        }
      ]
    },
    {
      label: 'Level one 3',
      children: [
        {
          label: 'Level two 3-1',
          children: [
            {
              label: 'Level three 3-1-1'
            }
          ]
        },
        {
          label: 'Level two 3-2',
          children: [
            {
              label: 'Level three 3-2-1'
            }
          ]
        }
      ]
    }
  ],

  defaultProps: {
    children: 'children',
    label: 'label'
  }
}
</script>

<style lang="scss" scoped></style>
