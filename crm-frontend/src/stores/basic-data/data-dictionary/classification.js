/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-10-31 15:54:40
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-01 14:52:29
 * @FilePath: \crm-frontend\src\stores\basic-data\data-dictionary\classification.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryDictclassify } from '@/apis/basic-data/data-dictionary/classification'
export const useClassificationStore = defineStore('classification', () => {
  const tableData = ref([])
  const getDictclassify = async (params) => {
    await queryDictclassify(params)
      .then((response) => {
        tableData.value = response.data.rows.map((row) => {
          return {
            typeName: row.typeName,
            typeTag: row.typeTag,
            intro: row.intro,
            sort: row.sort,
            visible: row.visible ? true : false,
            seotitle: row.seotitle,
            keywords: row.keywords
          }
        })
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  return {
    tableData,
    getDictclassify
  }
})
