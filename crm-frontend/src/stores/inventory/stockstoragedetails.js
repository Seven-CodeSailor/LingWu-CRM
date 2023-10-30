/*
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-10-27 22:00:55
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-10-29 00:02:52
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\inventory\stockstoragedetails.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryStorageDetails } from '@/apis/inventory-manager/index.js'
export const useStockStorageDetailsStore = defineStore(
  'stockstoragedetails',
  () => {
    const tableData = ref([])
    const tableTotal = ref()
    // 获取表格数据的方法
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
