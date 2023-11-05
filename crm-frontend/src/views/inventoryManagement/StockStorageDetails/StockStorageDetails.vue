<template>
  <div class="storage_details">
    <BaseDataList
      title="入库明细"
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="false"
      :page-sizes="[5, 10, 15]"
      :total="stockStorageDetailsStore.tableTotal"
      :table-data="stockStorageDetailsStore.tableData"
      @update-table-data="
        (pageSize, currentPage) =>
          getStockStorageList({
            pageSize,
            pageIndex: currentPage
          })
      "
      ref="baseDataListRef"
    >
      <template #menu>
        <div class="menu">
          <div class="left">
            <BulkOPe
              :excelData="t1"
              :getOpt="() => [0]"
              excelName="入库明细.xlsx"
              tableName="入库明细的sheet表"
            >
            </BulkOPe>
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="输入商品名称或者SKU名称"
              style="margin-right: 4px"
            />
            <DropDown
              v-model:input-value1="topInputValue"
              v-model:input-value2="bottomInputValue"
              input-title1="供应商名称"
              input-title2="通信地址"
              @handle-search="handleSearch"
            ></DropDown>
            <el-button @click="test">获取勾选的rows</el-button>
            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="searchDetails"
            >
              <el-icon style="margin-right: 4px"><icon-search /></el-icon
              >搜索</el-button
            >
          </div>
        </div>
      </template>
      <template #ico
        ><el-icon><icon-message-box /></el-icon
      ></template>
    </BaseDataList>
  </div>
</template>

<script setup>
// 冰雾
import { ref, onMounted } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { useStockStorageDetailsStore } from '@/stores/inventory/stockstoragedetails.js'
const tableColumnAttribute = [
  {
    prop: 'goodsIdAndSkuId',
    label: '商品ID/SKU ID'
  },
  {
    prop: 'goodsNameAndSkuNmae',
    label: '商品名称/SKU 名称',
    sortable: true
  },
  {
    prop: 'number',
    label: '数量'
  },
  {
    prop: 'categoryName',
    label: '商品类型'
  },
  {
    prop: 'storeName',
    label: '仓库名称'
  },
  {
    prop: 'intoIntro',
    label: '对应入库单'
  },
  {
    prop: 'intoTime',
    label: '入库时间'
  },
  {
    prop: 'remarks',
    label: '备注'
  }
]
const baseDataListRef = ref(null)
const inputValue = ref('')

const stockStorageDetailsStore = useStockStorageDetailsStore()

const searchDetails = () => {
  console.log('t', stockStorageDetailsStore.tableData)
  if (!inputValue.value) {
    ElMessage.error('输入不能为空')
  } else {
    console.log('pp', baseDataListRef.value.paginationData)
    baseDataListRef.value.paginationData.pageSize = 5
    baseDataListRef.value.paginationData.currentPage = 1
    // 搜索数据的时候就重新初始化页面容量和当前页的页码
    const params = {
      pageSize: 5,
      pageIndex: 1
      // 如何知道我输入的是sku名称或商品名
    }
    getStockStorageList(params)
  }
}
const getStockStorageList = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await stockStorageDetailsStore.getTableData(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}

const topInputValue = ref('')
const bottomInputValue = ref('')
const handleSearch = () => {
  console.log('调用search函数')
}

const test = () => {
  const Data = baseDataListRef.value.rows
  const b = JSON.parse(JSON.stringify(Data))
  console.log('v1', baseDataListRef.value)
  console.log('b1', b)
}

// const aa = () => {
//   console.log('aa')
//   return []
// }

const t1 = () => {
  // console.log('t1'.Data)
  // // console.log('v', baseDataListRef.value)

  // // // const b = JSON.parse(JSON.stringify(Data))
  // // console.log('b', Data)
  // console.log('ss')
  return baseDataListRef.value.rows // 相对于return []
}

// const t2 = () => {
//   const tableData = baseDataListRef.value.rows
//   console.log('tabledata', tableData)
//   // t1(JSON.parse(JSON.stringify(tableData)))
//   return [
//     {
//       性别: '男',
//       年龄: '19',
//       爱好: '唱',
//       name: 'a'
//     },
//     {
//       性别: '女',
//       年龄: '21',
//       爱好: 'rap',
//       address: 'b'
//     },
//     {
//       性别: '男',
//       年龄: '22',
//       爱好: '篮球',
//       habb: 'c'
//     }
//   ]
// }

onMounted(() => {
  const params = {
    pageIndex: 1,
    pageSize: 5
  }
  getStockStorageList(params)
})
</script>

<style lang="scss" scoped>
.storage_details {
  width: 100%;
  height: 100%;
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      height: 40px;
    }
    .right {
      height: 40px;
      display: flex;
      align-items: center;
    }
  }
}
// 表格里的内容换行用
:deep(.el-table .cell) {
  white-space: pre-wrap;
}
</style>
