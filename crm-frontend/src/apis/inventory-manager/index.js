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

// 以下是mock测试用例,暂时别删
export const getInventortOutTableList = (theUrl) => {
  return Request.requestJson(Request.GET, theUrl)
  // return new Promise((resolve) => {
  //   resolve(data)
  // }).then((res) => {
  //   // 写死数据
  //   // 将数据存储在pinia
  //   console.log(res)
  // })
}

export const getOutTableList = () => {}

//
export const test = async (data, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/69jekXFeb89500c132462100d3745b0046ecd1264eeb224/test',
    {}
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
