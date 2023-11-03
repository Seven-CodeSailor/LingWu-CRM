/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-10-31 16:45:52
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-03 20:19:18
 * @FilePath: \crm-frontend\src\apis\basic-data\data-dictionary\management.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Request from '@/apis/request.js'
/**
 * @description: 获取字典管理列表
 * @param {*} success
 * @param {*} fail
 * @return {*}
 */
export const getPagedict = async (success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-Pagedict'
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
/**
 * @description: 查询字典数据
 * @param {*} params // pageSize pageIndex name  分类名称 typetag 调用标识
 * @param {*} success
 * @param {*} fail
 * @return {*}
 */
export const getDict = async (params, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
    {
      params
    }
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
