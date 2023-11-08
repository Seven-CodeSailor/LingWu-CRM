/*
 * @Author: BINGWU
 * @Date: 2023-11-07 22:08:08
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-08 21:10:05
 * @FilePath: \crm-frontend\src\apis\basic-data\financial-type\expensetype.js
 * @Describe:费用开支模块的api
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = '/cpp1-apiv1'
// 干不动了
export const addBankaccount = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/financial-management/bankaccount/add-bankaccount',
    params
  )
}
