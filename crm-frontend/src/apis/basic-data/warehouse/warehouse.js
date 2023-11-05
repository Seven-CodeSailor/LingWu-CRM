/*
 * @Author: BINGWU
 * @Date: 2023-11-03 23:36:26
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-05 21:27:55
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\basic-data\warehouse\warehouse.js
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

export const addStore = async (params) => {
  return await Request.requestForm(
    Request.POST,
    baseUrl + '/j3-controller-warehouse/add-store',
    params
  )
}

export const modifyStoreInfo = async (params) => {
  return await Request.requestForm(
    Request.POST,
    baseUrl + '/j3-controller-warehouse/modify-store-info',
    params
  )
}

export const deleteStore = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/j3-controller-warehouse/delete-store',
    params
  )
}

export const exportStore = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/j3-controller-warehouse/export-store',
    params
  )
}
