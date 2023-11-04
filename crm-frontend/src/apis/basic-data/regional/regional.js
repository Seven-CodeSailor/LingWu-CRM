/*
 * @Author: BINGWU
 * @Date: 2023-11-04 00:24:28
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 14:42:00
 * @FilePath: \crm-frontend\src\apis\basic-data\regional\regional.js
 * @Describe:
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
const baseUrl = '/wahaha'
/**
 * @description: 获取区域列表
 * @param {Object} params
 * @return {Promise}
 */
export const queryListArea = async (params) => {
  return await Request.requestJson(Request.GET, baseUrl + '/query-list-area', {
    params
  })
}
/**
 * @description: 删除地区
 * @param {Object} params
 * @return {Promise}
 */
export const deleteArea = async (params) => {
  return await Request.requestJson(
    Request.DELETE,
    baseUrl + '/j3-area/deleteArea',
    {
      params
    }
  )
}
/**
 * @description: 新增地区
 * @param {Object} params
 * @return {Promise}
 */
export const insertArea = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/j3-area/insertArea',
    params
  )
}
/**
 * @description: 修改地区
 * @param {Object} params
 * @return {Promise}
 */
export const modifyArea = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl + '/j3-area/modifyArea',
    params
  )
}
/**
 * @description: 获取区域名称结构树
 * @return {Promise}
 */
export const queryTree = async () => {
  return await Request.requestJson(Request.GET, baseUrl + '/j3-area/query-tree')
}
/**
 * @description: 获取区域下拉列表
 * @return {Promise}
 */
export const selectArea = async () => {
  return await Request.requestJson(
    Request.GET,
    baseUrl + '/j3-area/select-area'
  )
}
