import { defineStore } from 'pinia'
import { ref } from 'vue'

const useDashBoard = defineStore('dashBoard', () => {
  let data = ref({
    title: '数据统计',
    x: ['我的客户', '下属客户', '公海客户'],
    contractsNumber: [0, 0, 0],
    amount: [0, 0, 0]
  })

  const setData = (info) => {
    data.value = info
  }
  return {
    data,
    setData
  }
})

export default useDashBoard
