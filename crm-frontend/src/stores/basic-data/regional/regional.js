import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryListArea } from '@/apis/basic-data/regional/regional'
export const useRegionalStore = defineStore('regional', () => {
  const tableData = ref([])
  const total = ref(0)
  const getListArea = async (params) => {
    await queryListArea(params)
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
    getListArea
  }
})
