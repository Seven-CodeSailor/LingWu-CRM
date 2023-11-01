import { defineStore } from 'pinia'
import { ref } from 'vue'
// 这里是 资金管理/资金注入抽取 仓库
const useFundInjectionStore = defineStore('fundInjection', () => {
  // 银行账户列表数据 => 输入框下拉菜单
  const bankSelectList = ref([1, 2, 3])
  // 修改银行账户列表数据
  const setBankSelectList = (data) => {
    bankSelectList.value = data
  }
  return {
    bankSelectList,
    setBankSelectList
  }
})
export default useFundInjectionStore
