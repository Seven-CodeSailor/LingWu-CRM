/*
 * @Author: BINGWU
 * @Date: 2023-11-01 14:46:01
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-03 17:52:21
 * @FilePath: \crm-frontend\src\stores\basic-data\data-dictionary\management.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDictclassifylist } from '@/apis/publicInterface.js'
import {
  getPagedict,
  getDict,
  deleteDict,
  modifyDict
} from '@/apis/basic-data/data-dictionary/management'
export const useManagementStore = defineStore('management', () => {
  const options = ref([])
  const tableData = ref([])
  // 获取字典下拉列表分类
  const getOptions = async (params) => {
    console.log('getOptions', params)
    await getDictclassifylist(
      params,
      (response) => {
        options.value = response.data.rows.map((row) => {
          return {
            value: row.typeName,
            label: row.typeName,
            typeTag: row.typeTag
          }
        })
      },
      (error) => {
        console.log('error', error)
      }
    )
  }
  const getDictList = async () => {
    await getPagedict()
      .then((response) => {
        tableData.value = response.data.rows.map((row) => {
          row.visible = row.visible ? true : false
          return row
        })
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
  const queryDictList = async (params) => {
    console.log('queryDictList', params)
    await getDict(params)
      .then((response) => {
        tableData.value = response.data.rows.map((row) => {
          row.visible = row.visible ? true : false
          return row
        })
      })
      .catch((error) => {
        console.log('error: ', error)
      })
  }
  const deleteDictList = async (params) => {
    console.log('deleteDictList', params)
    return await deleteDict(params)
  }
  const modifyDictList = async (params) => {
    console.log('modifyDictList', params)
    return await modifyDict(params)
  }
  return {
    options,
    tableData,
    getOptions,
    getDictList,
    queryDictList,
    deleteDictList,
    modifyDictList
  }
})
