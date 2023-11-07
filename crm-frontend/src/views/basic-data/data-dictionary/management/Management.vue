<template>
  <div class="management">
    <BaseDataList
      title="字典管理"
      :table-data="managementStore.tableData"
      :table-column-attribute="tableColumnAttribute"
      :use-dropdown-menu="true"
      :dropdown-menu-actions-info="dropdownMenuActionsInfo"
      :page-sizes="[5, 10, 15]"
      :total="999"
      @update-table-data="
        (pageSize, pageIndex) => {
          getTableData({
            pageSize,
            pageIndex
          })
        }
      "
      @update-switch-state="get1"
      ref="baseDataListRef"
    >
      <template #ico>
        <el-icon><icon-message-box /></el-icon
      ></template>
      <template #menu>
        <div class="content">
          <div class="left">
            <el-button type="primary" @click="handleAdd">添加数据</el-button>
            <el-button type="danger" @click="handleDelete">批量删除</el-button>
          </div>
          <div class="right">
            <ChooseSelect
              des="请选择字典分类"
              :options="managementStore.options"
              @update:cid="
                (selectValue) => {
                  getTableData({
                    pageIndex: 1,
                    pageSize: 5,
                    name: selectValue.value,
                    typeTag: selectValue.typeTag
                  })
                }
              "
              ref="chooseSelectRef"
            ></ChooseSelect>
            <el-input
              v-model="inputValue"
              placeholder="请输入搜索名称"
              style="margin: 0 4px; width: 200px"
            />
            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="handleSearch"
            >
              <el-icon style="margin-right: 4px"><icon-search /></el-icon
              >搜索</el-button
            >
          </div>
        </div>
      </template>
    </BaseDataList>
    <DictionaryManageFormCom
      :title="title"
      :options="managementStore.options"
      :handle-submit="handleSubmit"
      ref="dictionaryManageFormRef"
    ></DictionaryManageFormCom>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ChooseSelect from '@/components//ChooseSelect/ChooseSelect.vue'
import DictionaryManageFormCom from '../components/FormCom/DictionaryManageFormCom.vue'
import { useManagementStore } from '@/stores/basic-data/data-dictionary/management'
const baseDataListRef = ref(null)
const chooseSelectRef = ref(null)
const managementStore = useManagementStore()
// 列的数据id
const rowId = ref('')
const inputValue = ref('')
const tableColumnAttribute = ref([
  {
    prop: 'id',
    label: '编号'
  },
  {
    prop: 'name',
    label: '字典名称'
  },
  {
    prop: 'typeName',
    label: '分类名称'
  },
  {
    prop: 'typeTag',
    label: '调用标识'
  },
  {
    prop: 'sort',
    label: '排序',
    sortable: true
  },
  {
    prop: 'visible',
    label: '是否启用',
    useSwitch: true
  }
])
const dictionaryManageFormRef = ref(null)
const title = ref('')

const dropdownMenuActionsInfo = [
  {
    command: 'delete',
    // row为当前行的数据
    handleAction: async (row) => {
      console.log('删除的回调函数', row)
      await deleteTableData({ id: row.id }).then(async (res) => {
        ElMessage({
          type: 'success',
          message: res.message
        })
        await getTableData({
          pageIndex: baseDataListRef.value.paginationData.currentPage,
          pageSize: baseDataListRef.value.paginationData.pageSize
        })
      })
    },
    actionName: '删除'
  },
  {
    command: 'edit',
    handleAction: (row) => {
      console.log('修改的回调函数', row)
      title.value = '字典修改'
      dictionaryManageFormRef.value.visible = true
      const { name, sort, visible, id, typeTag, typeName } = row
      rowId.value = id
      //  数据回显
      dictionaryManageFormRef.value.form = {
        name,
        sort,
        visible
      }
      // 等待dom加载完毕后再回显下拉框数据
      nextTick(() => {
        dictionaryManageFormRef.value.chooseSelectRef.selectValue = {
          label: typeName,
          value: typeName,
          typeTag
        }
      })
    },
    actionName: '修改'
  }
]
const getOptions = async () => {
  await managementStore.getOptions()
}

const getTableData = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await managementStore.queryDictList(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}

const deleteTableData = async (params) => {
  return await managementStore.deleteDictList(params)
}

const handleDelete = () => {
  if (!baseDataListRef.value.rows.length) {
    ElMessage.error('请先选择')
  } else {
    // 删除的逻辑
    console.log('1')
  }
}

const handleSearch = () => {
  if (!inputValue.value.length) {
    ElMessage.error('输入不能为空')
  } else {
    // 搜索的逻辑
    console.log('1')
  }
}

const get1 = (state, row) => {
  console.log('调用后端的接口发请求修改开关的state后才能真正改变开关的状态')
  console.log('开关的状态已被修改，为：', state)
  console.log('当前行的数据', row)
  // 开启loading
  baseDataListRef.value.openSwitchLoading =
    !baseDataListRef.value.openSwitchLoading
  // 关闭loading  模拟异步请求
  setTimeout(() => {
    baseDataListRef.value.openSwitchLoading =
      !baseDataListRef.value.openSwitchLoading
  }, 1000)
}

const handleAdd = () => {
  title.value = '字典添加'
  dictionaryManageFormRef.value.visible = true
}

const handleSubmit = () => {
  dictionaryManageFormRef.value.visible = false
}

onMounted(async () => {
  await getTableData({ pageIndex: 1, pageSize: 5 })
  await getOptions({ pageIndex: 1, pageSize: 5 })
})
</script>

<style lang="scss" scoped>
.management {
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
    }
  }
}
:deep(.el-select .el-input__wrapper) {
  height: 32px;
}
</style>
