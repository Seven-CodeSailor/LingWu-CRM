/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-11-01 14:46:01
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-01 14:48:12
 * @FilePath: \crm-frontend\src\stores\basic-data\data-dictionary\management.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDictclassifylist } from '@/apis/publicInterface.js'
import {
  getPagedict,
  getDict
} from '@/apis/basic-data/data-dictionary/management'
export const useManagementStore = defineStore('management', () => {
  const options = ref([])
  const getOptions = async (params) => {
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
  const tableData = ref([])
  const getDictList = async () => {
    await getPagedict(
      (response) => {
        tableData.value = response.data.rows.map((row) => {
          return {
            id: row.id,
            name: row.name,
            sort: row.sort,
            typeTag: row.typeTag,
            typeName: row.typename,
            visible: row.visible ? true : false
          }
        })
      },
      (error) => {
        console.log('er', error)
      }
    )
  }
  const queryDictList = async (params) => {
    await getDict(
      params,
      (response) => {
        tableData.value = response.data.rows.map((row) => {
          return {
            id: row.id,
            name: row.name,
            sort: row.sort,
            typeTag: row.typeTag,
            typeName: row.typename,
            visible: row.visible ? true : false
          }
        })
        console.log('r', tableData.value)
      },
      (error) => {
        console.log('er', error)
      }
    )
  }
  return {
    options,
    tableData,
    getOptions,
    getDictList,
    queryDictList
  }
})
