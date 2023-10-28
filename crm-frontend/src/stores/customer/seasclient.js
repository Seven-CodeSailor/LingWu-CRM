import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSeasClient = defineStore('seasClient', () => {
  let tableData = ref([
    {
      id: 1,
      name: '成都零起飞科技',
      createTime: '2023-02-11 14:50:14',
      belong: '中国',
      lastContact: '2023-09-20 18:35:14',
      content: '干饭干饭',
      nextContact: '2023-09-18 11:55:14'
    },
    {
      id: 2,
      name: '成都零起飞科技',
      createTime: '2023-02-11 14:50:14',
      belong: '中国',
      lastContact: '2023-09-24 18:35:14',
      content: '干饭干饭',
      nextContact: '2023-09-12 11:55:14'
    },
    {
      id: 3,
      name: '成都零起飞科技',
      createTime: '2023-02-06 14:50:14',
      belong: '中国',
      lastContact: '2023-09-19 18:35:14',
      content: '干饭干饭',
      nextContact: '2023-09-28 11:55:14'
    },
    {
      id: 4,
      name: '成都零起飞科技',
      createTime: '2023-02-14 14:50:14',
      belong: '中国',
      lastContact: '2023-09-29 18:35:14',
      content: '干饭干饭',
      nextContact: '2023-09-18 11:55:14'
    }
  ])

  return {
    tableData
  }
})

export default useSeasClient
