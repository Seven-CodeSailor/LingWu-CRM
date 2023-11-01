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
        <el-button type="primary" @click="addType">添加</el-button>
      </template>
    </BaseDataList>
    <!-- 表单组件 -->
    <DictionaryEditFormCom
      ref="DictionaryEditFormRef"
      :title="title"
      :handle-submit="submitType"
    ></DictionaryEditFormCom>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import DictionaryEditFormCom from '../components/FormCom/DictionaryEditFormCom.vue'
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
  DictionaryEditFormRef.value.visible = true
  // 数据回显
  DictionaryEditFormRef.value.form = {
    ...row
  }
  title.value = '编辑分类'
}

const addType = () => {
  DictionaryEditFormRef.value.visible = true
  title.value = '添加分类'
}

const submitType = () => {
  console.log('s', DictionaryEditFormRef.value.formRef)
  DictionaryEditFormRef.value.formRef.validate((valid) => {
    if (valid) {
      console.log('qqq')
    } else {
      console.log('bbb')
    }
  })
  // 清空表单
  DictionaryEditFormRef.value.form = {
    typeName: '',
    typeTag: '',
    intro: '',
    sort: 0,
    visible: false
  }
  DictionaryEditFormRef.value.visible = false
}

const tableData = ref([
  {
    typeName: 'cxk',
    typeTag: '鸡',
    intro: '只因你太美',
    sort: 99,
    visible: false,
    seotitle: 99,
    keywords: 888
  },
  {
    typeName: 'cxk',
    typeTag: '鸡',
    intro: '只因你太美',
    sort: 90,
    visible: false,
    seotitle: 99,
    keywords: 888
  },
  {
    typeName: 'cxk',
    typeTag: '鸡',
    intro: '只因你太美',
    sort: 91,
    visible: true,
    seotitle: 99,
    keywords: 888
  }
])

const DictionaryEditFormRef = ref(null)

const title = ref('')
</script>

<style lang="scss" scoped></style>
