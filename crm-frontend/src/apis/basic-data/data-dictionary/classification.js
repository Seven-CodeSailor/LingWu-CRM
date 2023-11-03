/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-11-01 14:52:14
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-03 19:14:24
 * @FilePath: \crm-frontend\src\apis\basic-data\data-dictionary\classification.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

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
 * @return {*}
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
