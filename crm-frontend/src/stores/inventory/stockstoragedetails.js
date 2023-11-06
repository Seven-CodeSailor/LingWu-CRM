/*
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-10-27 22:00:55
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-06 17:36:37
 * @FilePath: \crm-frontend\src\stores\inventory\stockstoragedetails.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  queryStorageDetails,
  queryInventoryList
} from '@/apis/inventory-manager/index.js'
export const useStockStorageDetailsStore = defineStore(
  'stockstoragedetails',
  () => {
    const tableData = ref([])
    const tableTotal = ref()
    const getStorageDetails = async (params) => {
      await queryStorageDetails(params)
        .then((res) => {
          const { rows, total } = res.data
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
        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    return {
      getStorageDetails,
      tableData,
      tableTotal
    }
  }
)
