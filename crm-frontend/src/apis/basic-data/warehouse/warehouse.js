/*
 * @Author: BINGWU
 * @Date: 2023-11-03 23:36:26
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 00:13:16
 * @FilePath: \crm-frontend\src\apis\basic-data\warehouse\warehouse.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = 'http://8.130.82.226:10033/api'

export const queryStore = async (params) => {
  return await Request.requestJson(
    Request.GET,
    baseUrl + '/j3-controller-warehouse/query-store',
    {
      params
    }
  )
}
