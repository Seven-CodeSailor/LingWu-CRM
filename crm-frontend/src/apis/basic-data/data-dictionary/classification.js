/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-11-01 14:52:14
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-01 15:33:03
 * @FilePath: \crm-frontend\src\apis\basic-data\data-dictionary\classification.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'
/**
 * @description: 获取字典分类的数据
 * @param {*} params // pageIndex pageSize
 * @return {*}
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

export const addDictclassify = (params) => {
  return Request.requestJson(
    Request.POST,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/​/query-dictclassify',
    {
      params
    }
  )
}
