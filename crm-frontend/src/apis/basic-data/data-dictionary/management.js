/*
 * @Author: BINGWU
 * @Date: 2023-10-31 16:45:52
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-03 20:54:12
 * @FilePath: \crm-frontend\src\apis\basic-data\data-dictionary\management.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '@/apis/request.js'
/**
 * @description: 获取字典管理列表
 * @return {Promise}
 */
export const getPagedict = async () => {
  return await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-Pagedict'
  )
}
/**
 * @description: 查询字典管理数据
 * @param {Object} params // pageSize pageIndex name  分类名称 typetag 调用标识
 * @return {Promise}
 */
export const getDict = async (params) => {
  return await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
    {
      params
    }
  )
}

/**
 * @description: 删除字典管理数据
 * @param {Object} params  id
 * @return {Promise}
 */
export const deleteDict = async (params) => {
  return await Request.requestJson(
    Request.DELETE,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
    {
      params
    }
  )
}

export const modifyDict = async (params) => {
  return await Request.requestJson(
    Request.PUT,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
    params
  )
}
