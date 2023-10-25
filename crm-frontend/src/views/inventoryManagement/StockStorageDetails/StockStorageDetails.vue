<template>
  <div class="storage_details">
    <BaseDataList
      title="入库明细"
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="false"
      :page-sizes="[5, 10, 15]"
      :total="tableTotal"
      :table-data="tableData"
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
            <el-button
              style="margin-right: 4px"
              @click="() => getStockStorageList({ pageIndex: 1, pageSize: 5 })"
            >
              <el-icon style="margin-right: 4px"><icon-refresh /></el-icon
              >刷新</el-button
            >
            <BulkOPe
              :excelData="() => tableData"
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

import { queryStorageDetails } from '@/apis/inventory-manager/index.js'
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
const tableData = ref([])
const tableTotal = ref(99)
const inputValue = ref('')
const searchDetails = () => {
  if (!inputValue.value) {
    ElMessageBox.alert('输入不能为空', '注意!', {
      confirmButtonText: '确认'
    })
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
const getStockStorageList = (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  queryStorageDetails(params).then((res) => {
    console.log('res', res)
    const { rows, total } = res.data.data
    console.log('tt', total)
    tableTotal.value = total
    tableData.value = rows.map((item) => {
      return {
        goodsIdAndSkuId: `商品：${item.goods_id}\n SKU：${item.sku_id}`,
        goodsNameAndSkuNmae: `商品名：${item.goods_name}\n SKU名：${item.sku_name}`,
        number: item.number,
        categoryName: item.category_name,
        storeName: item.store_name,
        intoIntro: item.into_intro,
        intoTime: item.into_time,
        remarks: item.remarks,
        supplierName: item.supplier_name
      }
    })
    baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  })
}

onMounted(() => {
  const params = {
    pageSize: baseDataListRef.value.paginationData.pageSize,
    pageIndex: baseDataListRef.value.paginationData.currentPage
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
