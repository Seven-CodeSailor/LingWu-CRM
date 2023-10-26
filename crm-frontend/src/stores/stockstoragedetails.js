import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryStorageDetails } from '@/apis/inventory-manager/index.js'
export const useStockStorageDetailsStore = defineStore(
  'stockstoragedetails',
  () => {
    const tableData = ref([])
    const tableTotal = ref()
    const getTableData = async (params) => {
      await queryStorageDetails(
        params,
        (res) => {
          console.log('5')
          const { rows, total } = res.data.data
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
        },
        (err) => {
          console.log('err', err)
        }
      )
    }
    return {
      getTableData,
      tableData,
      tableTotal
    }
  }
)
