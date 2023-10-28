<template>
  <!-- 测试 -->
  <BaseDataList
    title="库存清单"
    :tableColumnAttribute="tableColumnAttribute"
    :use-operate-column="false"
    :table-data="inventoryList.tableData"
    :page-sizes="[5, 10, 15]"
    :total="inventoryList.totalTable"
    @update-table-data="
      (pageSize, currentPage) =>
        getList({
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
            :excelData="() => stockStorageDetailsStore.tableData"
            :getOpt="() => [0]"
            excelName="入库明细.xlsx"
            tableName="入库明细的sheet表"
          >
          </BulkOPe>
        </div>
        <div class="right">
          <el-input
            v-model="name"
            placeholder="输入商品名称或者SKU名称"
            style="margin-right: 4px"
          />
          <DropDown
            v-model:topInputValue="supplier_name"
            v-model:bottomInputValue="mailing_address"
            topInputTitle="供应商名称"
            bottomInputTitle="通信地址"
            @handle-search="handleSearch"
          ></DropDown>
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
  </BaseDataList>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import useInventoryList from '@/stores/inventory/inventoryList.js'
import { ref, onMounted } from 'vue'

const inventoryList = useInventoryList()

// BaseDataList实例，接收返回的数据
const baseDataListRef = ref(null)

// 分页数据
let params = ref({
  pageIndex: 1,
  pageSize: 5
})
// 表头列数据
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
    label: '库存数量',
    sortable: true
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
    prop: 'salePrice',
    label: '销售价格'
  },
  {
    prop: 'costPrice',
    label: '成本价格'
  },
  {
    prop: 'costAmount',
    label: '成本金额'
  },
  {
    prop: 'anticipatedProfit',
    label: '预计利润'
  },
  {
    prop: 'originalCode',
    label: '原厂编码'
  }
]

const getList = async (extra) => {
  await inventoryList.getTableData({ ...params.value, ...extra })
}

onMounted(async () => {
  getList()
})

// 按sku名称或商品名搜索
const name = ref()
const searchDetails = () => {
  if (!name.value) {
    ElMessage.error('输入不能为空')
  } else {
    getList({ name: name.value })
    name.value = ''
  }
}

// 按供应商和通信地址搜索
const supplier_name = ref()
const mailing_address = ref()
const handleSearch = () => {
  if (!supplier_name.value && !mailing_address.value) {
    ElMessage.error('至少有一个输入')
  } else {
    getList({
      supplier_name: supplier_name.value,
      mailing_address: mailing_address.value
    })
    supplier_name.value = ''
    mailing_address.value = ''
  }
}
</script>

<style scoped>
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
</style>
