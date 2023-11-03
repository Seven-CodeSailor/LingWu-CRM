import { defineStore } from 'pinia'
import { ref } from 'vue'

const useRecords = defineStore('records', () => {
  const tableData = ref([
    {
      bankId: '', //银行账号
      income: 0, //收入
      expenditrue: 0, //支出
      surplus: 0, //余额
      type: '', //支出类型
      connectId: '', //关联单号
      createUser: '', //创建人
      createTime: '' // 创建时间
    }
  ])
  // 设置表格数据
  const setTableData = (data = []) => {
    tableData.value = data
  }
  // 收入合计
  const totalIncome = ref([0])
  // 设置收入合计
  const setTotalIncome = (data = 0) => {
    totalIncome.value = data
  }
  // 支出合计
  const totalExpenditure = ref([0])
  // 设置支出合计
  const setTotalExpenditure = (data = 0) => {
    totalExpenditure.value = data
  }
  return {
    tableData,
    setTableData,
    totalIncome,
    setTotalIncome,
    totalExpenditure,
    setTotalExpenditure
  }
})

export default useRecords
