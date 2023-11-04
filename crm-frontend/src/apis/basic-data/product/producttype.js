/*
 * @Author: BINGWU
 * @Date: 2023-11-04 14:08:41
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 14:08:55
 * @FilePath: \crm-frontend\src\apis\basic-data\product\producttype.js
 * @Describe: 商品类型模块的api
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = ''

export const addType = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/goods/type/add-type',
    params
  )
}
