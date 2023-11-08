/*
 * @Author: BINGWU
 * @Date: 2023-10-26 20:52:05
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-06 17:35:13
 * @FilePath: \crm-frontend\src\apis\inventory-manager\index.js
 * @Describe:
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '../request'

// 定义一个功能模块基础url，方便替换
const currBaseUrl = '/cpp5-inventory'
/**
 * @description: 获取入库明细项列表
 * @param {Object} params
 * @return {Promise}
 */
export const queryStorageDetails = async (params) => {
  return await Request.requestJson(
    Request.GET,
    currBaseUrl + '/inventory-manager/query-storage-details',
    params
  )
}

/**
 * @description: 查询入库明细
 * @param {Object} params
 * @return {Promise}
 */
export const queryInventoryList = async (params) => {
  await Request.requestJson(
    Request.GET,
    '/inventory-manager/query-instorage_details',
    params
  )
}

// 导出入库明细
export const exportStorageDetails = async (
  list_id = [],
  success = () => {},
  fail = () => {}
) => {
  let data = []
  list_id.forEach((item) => {
    data.push({ list_id: item })
  })
  Request.requestJson(
    Request.POST,
    '/inventory-manager/export-storage-details',
    data
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}

// 确认入库
export const modifyConfirmStorage = async (
  id,
  into_user_id,
  success = () => {},
  fail = () => {}
) => {
  Request.requestJson(Request.PUT, '/inventory-manager/modify-ConfirmStorage', {
    id,
    into_user_id
  })
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}

// 删除入库单
export const deleteStorage = async (
  id = [],
  success = () => {},
  fail = () => {}
) => {
  let data = []
  id.forEach((item) => {
    data.push({ id: item })
  })
  Request.requestJson(
    Request.DELETE,
    '/inventory-manager/modify-ConfirmStorage',
    data
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
