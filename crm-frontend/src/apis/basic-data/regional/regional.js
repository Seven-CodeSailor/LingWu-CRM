/*
 * @Author: BINGWU
 * @Date: 2023-11-04 00:24:28
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 11:25:54
 * @FilePath: \crm-frontend\src\apis\basic-data\regional\regional.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = '/api1'

export const queryListArea = async (params) => {
  return await Request.requestJson(Request.GET, baseUrl + '/query-list-area', {
    params
  })
}
