/*
 * @Author: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @Date: 2023-11-02 15:23:01
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-04 20:54:35
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\organizationStructure\postManagement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 岗位管理仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
const usePostManageStore = defineStore('', () => {
  // 定义岗位名称列表数据
  const userPostList = ref([])
  // 设置岗位名称列表数据
  const setPostList = (dataList) => {
    userPostList.value = dataList
  }
  return {
    userPostList,
    setPostList
  }
})
export default usePostManageStore
