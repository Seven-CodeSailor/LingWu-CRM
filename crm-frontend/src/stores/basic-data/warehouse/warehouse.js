import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryStore } from '@/apis/basic-data/warehouse/warehouse'
export const useWarehouseStore = defineStore('warehouse', () => {
  const tableData = ref([])
  const total = ref(0)
  const getStoreList = async (params) => {
    console.log('getStoreList', params)
    await queryStore(params)
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  return {
    tableData,
    total,
    getStoreList
  }
})
