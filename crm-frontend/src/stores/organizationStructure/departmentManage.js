/*
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-11-02 15:22:19
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-06 11:03:22
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\organizationStructure\departmentManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 部门管理仓库223
import { defineStore } from 'pinia'
import { ref } from 'vue'
const useDepartmentManageStore = defineStore('DepartmentManage', () => {
  // 定义部门名称结构树 的数据
  const DepartmentTree = ref()
  const setDepartmentTree = (dataList) => {
    DepartmentTree.value = dataList
  }
  return {
    DepartmentTree,
    setDepartmentTree
  }
})
export default useDepartmentManageStore
