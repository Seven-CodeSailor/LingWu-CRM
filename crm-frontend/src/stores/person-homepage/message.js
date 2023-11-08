/*
 * @Author: setti5 2283356040@qq.com
 * @Date: 2023-11-01 21:29:51
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-08 14:29:06
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\person-homepage\message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { queryMessage } from '@/apis/personal-homapage/message.js'

// 根据分页条件获取消息列表
export const useMessageStore = defineStore('message', () => {
  const tableData = ref([])
  const total = ref()
  const getMessageStore = async (params) => {
    console.log('getMessageStore', params)
    await queryMessage(params)
      .then((res) => {
        tableData.value = res.data.rows.map((row) => {
          row.flag = {
            value: row.flag ? '已查看' : '未读',
            tagType: row.flag ? 'info' : '未读'
          }
          total.value = res.data.total
          return row
        })
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
  return {
    getMessageStore,
    tableData,
    total
  }
})
