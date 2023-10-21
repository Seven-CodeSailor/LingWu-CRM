<template>
  <div>
    测试：组织结构1
    <div>
      <organization-structure></organization-structure>
    </div>
  </div>
</template>

<script setup>
import organizationStructure from '@/components/organizationStructure/index.vue'
import { provide, readonly } from 'vue'

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
  total: 100
}
provide('sendData', readonly(sendData))
</script>

<style scoped></style>
