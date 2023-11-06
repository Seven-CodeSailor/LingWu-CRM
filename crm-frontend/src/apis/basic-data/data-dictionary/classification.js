/*
 * @Author: BINGWU
 * @Date: 2023-11-01 14:52:14
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-03 21:25:20
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-03 13:26:55
 * @FilePath: \crm-frontend\src\apis\basic-data\data-dictionary\classification.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
//test
import Request from '@/apis/request.js'
/**
 * @description: 获取字典分类的数据
 * @param {*} params // pageIndex pageSize
 * @return {Promise}
 */
export const queryDictclassify = (params) => {
  return Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/​/query-dictclassify',
    {
      params
    }
  )
}

/**
 * @description: 
 * @param {*} params 
 * 字段
 * {
  "id": 0,
  "typeName": "string",
  "typetag": "string",
  "sort": 0,
  "visible": 0,
  "intro": "string",
  "seotitle": 0,
  "keywords": 0
}
 * @return {Promise}
 */
export const addDictclassify = (params) => {
  return Request.requestJson(
    Request.POST,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/add-dictclassify',
    params
  )
}

/**
 * @description: 修改字典分类
 * @param {*} params
 * {
  "id": 0,
  "typeName": "string",
  "typetag": "string",
  "sort": 0,
  "visible": 0,
  "intro": "string",
  "seotitle": 0,
  "keywords": 0
}
 * @return {Promise}
 */
export const modifyDictclassify = (params) => {
  return Request.requestJson(
    Request.PUT,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/modify-dictclassify',
    params
  )
}

/**
 * @description: 删除字典分类数据
 * @param {*} params
 * id
 * @return {Promise}
 */
export const deleteDictclassify = (params) => {
  return Request.requestJson(
    Request.DELETE,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/delete-dictclassify',
    {
      params
    }
  )
}
