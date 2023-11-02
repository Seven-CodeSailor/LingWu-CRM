<!--
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-10-26 21:33:34
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-01 17:20:40
 * @FilePath: \crm-frontend\src\views\basic-data\data-dictionary\classification\Classification.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="classfication">
    <BaseDataList
      title="字典分类"
      :table-column-attribute="tableColumnAttribute"
      :handle-delete="handleDelete"
      :handle-edit="handleEdit"
      :table-data="classficationStore.tableData"
      :page-size="[5, 10, 15]"
      :total="classficationStore.total"
      @update-table-data="updateTableData"
      ref="baseDataListRef"
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
import { ref, onMounted } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import DictionaryEditFormCom from '../components/FormCom/DictionaryEditFormCom.vue'
import { useClassificationStore } from '@/stores/basic-data/data-dictionary/classification'
const classficationStore = useClassificationStore()
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
const baseDataListRef = ref(null)
const getTableData = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await classficationStore.getDictclassify(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}
const addTableData = async (params) => {
  await classficationStore.addDictclassifyItem(params)
}
const modifyTableData = async (params) => {
  await classficationStore.modifyDictclassifyItem(params)
}

const updateTableData = (pageSize, currentPage) => {
  getTableData({ pageSize, pageIndex: currentPage })
}

const handleDelete = (row) => {
  console.log('删除', row)
}

const handleEdit = (row) => {
  DictionaryEditFormRef.value.visible = true
  // 数据回显
  const newRow = { ...row }
  newRow.visible = newRow.visible ? true : false
  DictionaryEditFormRef.value.form = {
    ...newRow
  }
  title.value = '编辑分类'
}

const addType = () => {
  DictionaryEditFormRef.value.visible = true
  title.value = '添加分类'
}

const submitType = async () => {
  await DictionaryEditFormRef.value.formRef.validate(async (valid) => {
    if (valid) {
      const params = {
        ...DictionaryEditFormRef.value.form
      }
      params.visible = params.visible ? 1 : 0
      if (title.value === '添加分类') {
        // 接口函数
        await addTableData(params)
      } else {
        // 修改的接口函数
        await modifyTableData(params)
      }
    }
  })
  // 清空表单
  DictionaryEditFormRef.value.form = {
    typeName: '',
    typeTag: '',
    intro: '',
    sort: 0,
    visible: false,
    seotitle: 0,
    keywords: 0
  }
  DictionaryEditFormRef.value.visible = false
  // 更新表格数据
  await getTableData({
    pageSize: baseDataListRef.value.paginationData.pageSize,
    pageIndex: baseDataListRef.value.paginationData.currentPage
  })
}

const DictionaryEditFormRef = ref(null)

const title = ref('')

onMounted(() => {
  // 测试
  getTableData({ pageSize: 5, pageIndex: 1 })
  addTableData()
  modifyTableData()
})
</script>

<style lang="scss" scoped></style>
