import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  queryListArea,
  deleteArea,
  insertArea,
  modifyArea,
  queryTree,
  selectArea
} from '@/apis/basic-data/regional/regional'
export const useRegionalStore = defineStore('regional', () => {
  const tableData = ref([])
  const total = ref(999)
  const areaTreeData = ref([
    {
      value: '1',
      label: 'Level one 1',
      children: [
        {
          value: '1-1',
          label: 'Level two 1-1',
          children: [
            {
              value: '1-1-1',
              label: 'Level three 1-1-1'
            }
          ]
        }
      ]
    },
    {
      value: '2',
      label: 'Level one 2',
      children: [
        {
          value: '2-1',
          label: 'Level two 2-1',
          children: [
            {
              value: '2-1-1',
              label: 'Level three 2-1-1'
            }
          ]
        },
        {
          value: '2-2',
          label: 'Level two 2-2',
          children: [
            {
              value: '2-2-1',
              label: 'Level three 2-2-1'
            }
          ]
        }
      ]
    },
    {
      value: '3',
      label: 'Level one 3',
      children: [
        {
          value: '3-1',
          label: 'Level two 3-1',
          children: [
            {
              value: '3-1-1',
              label: 'Level three 3-1-1'
            }
          ]
        },
        {
          value: '3-2',
          label: 'Level two 3-2',
          children: [
            {
              value: '3-2-1',
              label: 'Level three 3-2-1'
            }
          ]
        }
      ]
    }
  ])
  const getListAreaItem = async (params) => {
    await queryListArea(params)
      .then((response) => {
        console.log('res', response.data.rows)
        tableData.value = response.data.rows
        total.value = response.data.total
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const deleteAreaItem = async (params) => {
    return await deleteArea(params)
  }
  const insertAreaItem = async (params) => {
    return await insertArea(params)
  }
  const modifyAreaItem = async (params) => {
    return await modifyArea(params)
  }
  const queryTreeItem = async () => {
    queryTree()
      .then((response) => {
        console.log('res', response)
      })
      .catch((error) => {
        console.log('err', error)
      })
  }
  const selectAreaItem = async () => {
    await selectArea()
      .then((response) => {
        console.log('res', response)
      })
      .catch((error) => {
        console.log('err', error)
      })
  }
  return {
    tableData,
    total,
    areaTreeData,
    getListAreaItem,
    deleteAreaItem,
    insertAreaItem,
    modifyAreaItem,
    queryTreeItem,
    selectAreaItem
  }
})
