/*
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-11-02 15:18:28
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-02 19:52:21
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\organizationStructure\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 用户管理接口
import Request from '../request'
/**
 * @description: 获取用户列表 分页+条件
 * @param {*} params 请求参数:{deptId(部门id), name(姓名),pageIndex(查询页码), pageSize(查询条数)}
 * @param {*} success 成功回调
 * @param {*} fail 失败回调
 * @Author{*} 暮秋(有问题找我)
 * @return {*}
 */
export const getUserTableList = async (params, success, fail) => {
  await Request.requestJson(
    Request.POST,
    'http://101.34.252.80:10110/orgstructure/user/user/query-all-by-deptid-or-name',
    params
  )
    .then((response) => {
      // 请求返回的数据就是response,在成功回调函数可以拿到
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
