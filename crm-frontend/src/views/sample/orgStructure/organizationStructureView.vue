<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-22 18:16:13
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-22 19:32:42
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\sample\orgStructure\organizationStructureView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->
<template>
  <div>
    <div class="header">
      <div>icon+title</div>
      <div><el-button>刷新</el-button></div>
    </div>
    <div>
      <organization-structure
        :sendData="sendData"
        :treeData="treeData"
      ></organization-structure>
    </div>
  </div>
</template>

<script setup>
import organizationStructure from '@/components/organizationStructure/index.vue'

const sendData = {
  tableColumnAttribute: [
    {
      prop: 'sex',
      label: '性别',
      sortable: true
    },
    {
      prop: 'age',
      label: '年龄',
      sortable: true
    },
    {
      prop: 'hoby',
      label: '爱好'
    }
  ],
  tableData: [
    {
      sex: '男',
      age: 19,
      hoby: '唱歌'
    },
    {
      sex: '女',
      age: 21,
      hoby: 'rap'
    },
    {
      sex: '男',
      age: 22,
      hoby: '篮球'
    }
  ],
  // 传入删除操作的函数就会显示删除按钮
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  pageSizes: [2, 10, 15, 200],
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

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
