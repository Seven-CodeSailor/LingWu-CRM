/*
 * @Author: setti5 2283356040@qq.com
 * @Date: 2023-11-01 21:29:40
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-06 21:03:36
 * @FilePath: \zero-one-crmsys\crm-frontend\src\stores\person-homepage\notice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { test } from '@/apis/inventory-manager/index.js'
import { 
  addNotice,
  getNotice,
  queryNotion,
  removeNotice,
  updateNotice
} from '@/apis/personal-homapage/notice.js'
import {getUserNameList } from '@/apis/publicInterface.js'
export const useNoticeStore = defineStore('notice', () => {
  const tableData = ref([])
  const total = ref(0)
  const optionsUserName = ref([])
  const getNoticeStore = async (params) => {
    console.log('getNoticeStore', params)
    await queryNotion(params)
    .then((res) => {
      tableData.value = res.data.rows.map((row)=>{
        row.status = {
          value:row.status?'已读':"未读",
          tagType:row.status?'info':'danger'
        }
        return row
      })
      total.value = 100
    })
    .catch((err) => {
      console.log('err', err)
    })
  }

  const getOptionsUserName = ()=>{
  getUserNameList({},(res)=>{
      optionsUserName.value = res.data.map((row)=>{
        return {
          label:row.name,
          value:row.id
        }
      })
    })
  }
  const useAddNotice = async (params)=>{
    return await addNotice(params)
  }

  return {
      getNoticeStore,
      tableData,
      total,
      useAddNotice,
      getOptionsUserName,
      optionsUserName

      // getNoticeDetails
  }
})

//以下是本地模拟数据，后期会删除
// export const useNotice = defineStore('notice', () => {
//   let state = ''
//   const data = ref([
//     {
//       headline: '雨',
//       publishing_content: '哈哈哈',
//       publisher: '小明',
//       release_time: '2023-01-01 22:32:19',
//       status: {
//         value: '未读',
//         tagType: 'danger'
//       },
//       recipient: '小红'
//     },
//     {
//       headline: '雨',
//       publishing_content: '哈哈哈',
//       publisher: '小明',
//       release_time: '2023-01-01 12:29:39',
//       status: {
//         value: '已查看',
//         tagType: 'info'
//       },
//       recipient: '小红'
//     }
//   ])
//   const d1 = ref([])
//   const str = ref('')
//   // action 处理state的数据
//   const getData = () => {
//     test(
//       {},
//       (response) => {
//         console.log('res', response)
//         str.value = response.data.data.str
//       },
//       (error) => {
//         console.log('error', error)
//       }
//     )
//   }

//   const getD1 = () => {
//     console.log(111)
//     let list_test = () => (
//       {},
//       (response) => {
//         console.log('res', response)
//         d1.value = response.data
//         // console.log('d1',response.data);
//       },
//       (error) => {
//         console.log('error', error)
//       }
//     )
//   }
  

//   return {
//     data,
//     str,
//     getData,
//     getD1,
//     d1
//   }
// })

  /**
   * 获取系统公告-muqiu
  */
//  const getNoticeApi = async(paramsObj)=> {
//   const {
//       content,
//       pageIndex,
//       pageSize,
//       title
//   } = paramsObj
//   await queryNotion({
//       content,
//       pageIndex,
//       pageSize,
//       title
//   },(res)=> {
//     console.log('获取系统公告',res)
//   })
//  }
