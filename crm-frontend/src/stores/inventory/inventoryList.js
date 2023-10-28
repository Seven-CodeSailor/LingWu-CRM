import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryInventoryList } from '@/apis/inventory-manager/index.js'

const useInventoryList = defineStore('inventoryList', () => {
  const tableData = ref([])
  const totalTable = ref(0)
  const datas = ref([])
  const getTableData = async (params) => {
    await queryInventoryList(
      params,
      (res) => {
        datas.value = res.data
        totalTable.value = datas.value.length
        tableData.value = datas.value.map((item) => {
          return {
            goodsIdAndSkuId: `商品：${item.goods_id}\n SKU：${item.sku_id}`,
            goodsNameAndSkuNmae: `商品名：${item.goods_name}\n SKU名：${item.sku_name}`,
            number: item.number,
            categoryName: item.category_name,
            storeName: item.store_name,
            salePrice: item.sale_price,
            costPrice: item.cost_price,
            costAmount: item.cost_amount,
            anticipatedProfit: item.anticipated_profit,
            originalCode: item.Original_code
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
    datas,
    totalTable
  }
})

export default useInventoryList
