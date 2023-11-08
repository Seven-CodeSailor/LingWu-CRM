/*
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-11-02 15:19:11
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-08 21:00:23
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\organizationStructure\postManagement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 岗位管理接口
import Request from '../request'
/**
 * @description: 获取岗位名称结构树
 * @param {*} params 请求参数:
 * {
 *  depth: 查询深度,
 *  pid: '父级角色ID'
 * }
 * @param {*} success 成功回调
 * @param {*} fail 失败回调
 * @Author{*} 暮秋(有问题找我)
 * @return {*}
 */
export const getRoleTree = async (params, success, fail) => {
  await Request.requestForm(
    Request.GET,
    'http://101.34.252.80:10110/orgstructure/position/position/list-name-tree',
    { params }
  )
    .then((response) => {
      // 请求返回的数据就是response,在成功回调函数可以拿到
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
