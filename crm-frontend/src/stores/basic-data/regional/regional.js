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
  const tableData = ref([
    {
      id: 1,
      name: '西南地区',
      parentID: '0',
      sort: 1,
      visible: 1,
      intro: 'xxxx'
    },
    {
      id: 2,
      name: '中东地区',
      parentID: '1',
      sort: 2,
      visible: 0,
      intro: '哈哈哈哈'
    },
    {
      id: 3,
      name: '美国',
      parentID: '1',
      sort: 3,
      visible: 0,
      intro: '枪战每一天'
    },
    {
      id: 4,
      name: '中国',
      parentID: '1',
      sort: 4,
      visible: 1,
      intro: '中国'
    },
    {
      id: 5,
      name: '日本',
      parentID: '1',
      sort: 5,
      visible: 0,
      intro: '日本'
    },
    {
      id: 6,
      name: '韩国',
      parentID: '1',
      sort: 6,
      visible: 1,
      intro: '韩国'
    }
  ])
  const total = ref(999)
  const areaTreeData = ref([
    {
      id: 1,
      label: '西南地区',
      sort: 1,
      visible: 1,
      intro: 'xxxx',
      level: 1,
      children: [
        {
          id: 2,
          label: '中东地区',
          sort: 2,
          visible: 0,
          intro: '哈哈哈哈',
          treeName: '||-西南地区',
          level: 2,
          children: []
        },
        {
          id: 3,
          label: '美国',
          sort: 3,
          visible: 0,
          intro: '枪战每一天',
          treeName: '||-西南地区',
          level: 2,
          children: []
        },
        {
          id: 4,
          label: '中国',
          sort: 4,
          visible: 1,
          intro: '中国',
          treeName: '||-西南地区',
          level: 2,
          children: []
        },
        {
          id: 5,
          label: '日本',
          sort: 5,
          visible: 0,
          intro: '日本',
          treeName: '||-西南地区',
          level: 2,
          children: []
        },
        {
          id: 6,
          label: '韩国',
          sort: 6,
          visible: 1,
          intro: '韩国',
          treeName: '||-西南地区',
          level: 2,
          children: []
        }
      ]
    }
  ])
  const getListAreaItem = async (params) => {
    console.log('queryListArea', params)
    await queryListArea(params)
      .then((response) => {
        console.log('res', response)
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
