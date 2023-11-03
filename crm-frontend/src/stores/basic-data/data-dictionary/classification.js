/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-10-31 15:54:40
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-01 16:57:45
 * @FilePath: \crm-frontend\src\stores\basic-data\data-dictionary\classification.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  queryDictclassify,
  addDictclassify,
  modifyDictclassify,
  deleteDictclassify
} from '@/apis/basic-data/data-dictionary/classification'
export const useClassificationStore = defineStore('classification', () => {
  const tableData = ref([])
  const total = ref(0)
  const getDictclassify = async (params) => {
    console.log('p', params)
    await queryDictclassify(params)
      .then((response) => {
        tableData.value = response.data.rows
        total.value = response.data.total
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const addDictclassifyItem = async (params) => {
    await addDictclassify(params)
      .then((response) => {
        console.log('response', response)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const modifyDictclassifyItem = async (params) => {
    await modifyDictclassify(params)
      .then((response) => {
        console.log('r', response)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  const deleteDictclassifyItem = async (params) => {
    deleteDictclassify(params)
      .then((response) => {
        console.log('deleteDictclassifyItem', response)
      })
      .catch((err) => {
        console.log('deletDictclassifyItem', err)
      })
  }
  return {
    tableData,
    total,
    getDictclassify,
    addDictclassifyItem,
    modifyDictclassifyItem,
    deleteDictclassifyItem
  }
})
