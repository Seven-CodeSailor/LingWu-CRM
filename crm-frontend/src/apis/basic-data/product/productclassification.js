/*
 * @Author: BINGWU
 * @Date: 2023-11-04 11:33:37
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 13:57:17
 * @FilePath: \crm-frontend\src\apis\basic-data\product\productclassification.js
 * @Describe: 商品分类模块的api
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */

import Request from '@/apis/request.js'
const baseUrl = ''
/**
 * @description: 新增商品分类
 * @param {Object} params
 * @return {Promise}
 */
export const goodsCategoryAdd = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/goods/category/add',
    params
  )
}
