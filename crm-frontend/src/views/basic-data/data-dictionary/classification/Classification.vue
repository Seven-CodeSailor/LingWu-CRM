<template>
  <div class="classfication">
    <BaseDataList
      title="字典分类"
      :table-column-attribute="tableColumnAttribute"
      :handle-delete="handleDelete"
      :handle-edit="handleEdit"
      :table-data="tableData"
    >
      <template #ico>
        <el-icon><icon-message-box /></el-icon
      ></template>
      <template #menu>
        <el-button type="primary">添加</el-button>
      </template>
    </BaseDataList>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
const tableColumnAttribute = ref([
  {
    prop: 'typeName',
    label: '分类名称'
  },
  {
    prop: 'typeTag',
    label: '调用标识'
  },
  {
    prop: 'intro',
    label: '备注'
  },
  {
    prop: 'sort',
    label: '排序',
    sortable: true
  }
])

const handleDelete = (row) => {
  console.log('删除', row)
}

const handleEdit = (row) => {
  console.log('编辑', row)
}

const tableData = ref([
  {
    typeName: 'cxk',
    typeTag: '鸡',
    intro: '只因你太美',
    sort: 99
  },
  {
    typeName: 'cxk',
    typeTag: '鸡',
    intro: '只因你太美',
    sort: 90
  },
  {
    typeName: 'cxk',
    typeTag: '鸡',
    intro: '只因你太美',
    sort: 91
  }
])
</script>

<style lang="scss" scoped></style>
