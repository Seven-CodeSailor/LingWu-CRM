<!--
 * @Author: BINGWU
 * @Date: 2023-10-26 21:33:34
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-03 17:35:23
 * @FilePath: \crm-frontend\src\views\basic-data\data-dictionary\classification\Classification.vue
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
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
      @update-table-data="
        (pageSize, pageIndex) => {
          getTableData({
            pageSize,
            pageIndex
          })
        }
      "
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
const DictionaryEditFormRef = ref(null)
const title = ref('')
const baseDataListRef = ref(null)
const getTableData = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await classficationStore.getDictclassify(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}
const addTableData = async (params) => {
  return await classficationStore.addDictclassifyItem(params)
}
const modifyTableData = async (params) => {
  return await classficationStore.modifyDictclassifyItem(params)
}

const deleteTableData = async (params) => {
  return await classficationStore.deleteDictclassifyItem(params)
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确认要删除吗?', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const { id } = row
      deleteTableData({ id }).then(async (res) => {
        ElMessage({
          type: 'success',
          message: res.message
        })
        // 更新表格数据
        await getTableData({
          pageSize: baseDataListRef.value.paginationData.pageSize,
          pageIndex: baseDataListRef.value.paginationData.currentPage
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
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
        const res = await addTableData(params)
        ElMessage({
          type: 'success',
          message: res.message
        })
      } else {
        // 修改的接口函数
        const res = await modifyTableData(params)
        ElMessage({
          type: 'success',
          message: res.message
        })
      }
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
  })
}

onMounted(() => {
  // 测试
  getTableData({ pageSize: 5, pageIndex: 1 })
  addTableData()
  modifyTableData()
})
</script>

<style lang="scss" scoped></style>
