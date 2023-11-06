/*
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-11-02 15:21:31
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-06 11:02:45
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\organizationStructure\rolesManage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 角色管理的仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useRoleManageStore = defineStore('roleManage',()=> {
  // 定义角色名称结构树
  const roleTreeList = ref([])
  // 修改角色名称结构树的方法
  const setRoleTreeList = (dataList) => {
    roleTreeList.value = dataList
  }
  return {
    roleTreeList,
    setRoleTreeList
  }
})
export default useRoleManageStore
