// 这里是 组织结构/用户管理 仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
const useUserManageStore = defineStore('userManage', () => {
  // 定义用户名称列表数据
  const userNameList = ref([])
  // 获取用户名称列表数据
  const setUserNameList = (dataList) => {
    userNameList.value = dataList
  }
  return {
    userNameList,
    setUserNameList
  }
})
export default useUserManageStore
