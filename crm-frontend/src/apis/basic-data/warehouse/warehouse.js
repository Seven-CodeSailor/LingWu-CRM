/*
 * @Author: BINGWU
 * @Date: 2023-11-03 23:36:26
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 20:51:55
 * @FilePath: \crm-frontend\src\apis\basic-data\warehouse\warehouse.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = '/java3-warehouse'

export const queryStore = async (params) => {
  return await Request.requestJson(
    Request.GET,
    baseUrl + '/j3-controller-warehouse/query-store',
    params
  )
}
