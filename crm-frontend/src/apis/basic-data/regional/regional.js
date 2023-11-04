/*
 * @Author: BINGWU
 * @Date: 2023-11-04 00:24:28
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-04 17:58:32
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\basic-data\regional\regional.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = '/wahaha'

export const queryListArea = async (params) => {
  return await Request.requestJson(
    Request.GET,
    '/bingwu/j3-area/query-list-area',
    {
      params
    }
  )
}
