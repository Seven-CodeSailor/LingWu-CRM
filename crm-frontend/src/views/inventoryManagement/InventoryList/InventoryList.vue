<template>
  <div class="inventory-list">
    <BaseDataList
      title="库存清单" 
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
            <el-button @click="refresh" type="info" circle style="margin-right:30px;">
              <el-button>
                <el-icon>
                  <icon-Refresh />
                </el-icon>
                刷新
              </el-button>
            </el-button>
            <BulkOPe
              :excelData="() => tableData"
              :getOpt="() => [0]"
              excelName="库存清单.xlsx"
              tableName="库存清单的sheet表"
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
              v-model:topInputValue="topInputValue"
              v-model:bottomInputValue="bottomInputValue"
              topInputTitle="供应商名称"
              bottomInputTitle="通信地址"
              @handle-search="handleSearch"
            ></DropDown>

            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="searchDetails"
            >
              <el-icon style="margin-right: 4px"> <icon-search /> </el-icon>
              搜索
            </el-button>
          </div>
        </div>
      </template>
      <template #ico>
        <el-icon> 
          <icon-HomeFilled /> 
        </el-icon>
      </template>
    </BaseDataList>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import DropDown from '../../../components/DropDown/DropDown.vue'
import { useStockStorageDetailsStore } from '@/stores/inventory/stockstoragedetails.js'

 // 控制表格是否加载
 const loading = ref(true)
// 点击刷新页面数据
const refresh = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = true
    }, 500)
  }
  

const tableColumnAttribute = [
  {
    prop: 'goods_id_and_sku_id',
    label: '商品ID/SKU ID'
  },
  {
    prop: 'goods_name_and_sku_nmae',
    label: '商品名称/SKU 名称',
    sortable: true
  },
  {
    prop: 'number',
    label: '库存数量'
  },
  {
    prop: 'category_name',
    label: '商品类型'
  },
  {
    prop: 'store_name',
    label: '仓库名称'
  },
  {
    prop: 'sale_price',
    label: '销售价格'
  },
  {
    prop: 'cost_price',
    label: '成本价格'
  },
  {
    prop: 'cost_amount',
    label: '成本金额'
  },
  {
    prop: 'anticipated_profit',
    label: '预计利润'
  },
  {
    prop: 'original_code',
    label: '原厂编码'
  },
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

onMounted(() => {
  const params = {
    pageIndex: 1,
    pageSize: 5
  }
  getStockStorageList(params)
})
</script>


<style lang="scss" scoped>
.inventory-list {
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
    .el-button {
      margin-left: 10px;
      // justify-content: center;
    }
  }
}
// 表格里的内容换行用
:deep(.el-table .cell) {
  white-space: pre-wrap;
}
</style>
