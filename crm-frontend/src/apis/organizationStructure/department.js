/*
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-11-02 15:17:44
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-03 18:18:37
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\organizationStructure\department.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Request from '../request'
// 部门管理接口
// import useDepartmentManageStore from '@/stores/organizationStructure/departmentManage.js'
// const departmentManage = useDepartmentManageStore()
/**
 * @description: 获取部门名称结构树
 * @param {*} params 请求参数:{depth(查询深度), pid:父级部门id}
 * @param {*} success 成功回调
 * @param {*} fail 失败回调
 * @Author{*} 暮秋(有问题找我)
 * @return {*}
 */
export const getDepartmentTree = async (params, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'http://101.34.252.80:10110/orgstructure/dept/dept/list-name-tree',
    {
      params
    }
  )
    .then((response) => {
      // 请求返回的数据就是response,在成功回调函数可以拿到
      success(response)
      // // 把响应数据存到 组织结构/部门管理 仓库
      // departmentManage.setDepartmentTree(response.data)
      // console.log(departmentManage.DepartmentTree)
    })
    .catch((error) => {
      fail(error)
    })
}
