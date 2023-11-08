import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  // addNotice,
  // getNotice,
  queryNotion
  // removeNotice,
  // updateNotice
} from '@/apis/personal-homapage/notice.js'
// 公共接口，获取用户列表
import { getUserNameList } from '@/apis/publicInterface.js'

export const useNoticeStore = defineStore('notice', () => {
  const tableData = ref([])
  const total = ref()
  const optionsUserName = ref([])
  const getStoreList = async (params) => {
    console.log('getStoreList', params)
    await queryNotion(params)
    .then((res) => {
      tableData.value = res.data.rows.map((row) => {
        row.status = {
          value: row.status ? '已读' : "未读",
          tagType: row.status ? 'info' : 'danger'
        }
        total.value = res.data.total
        return row
      })
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
  // const addNoticeItem = async (params)=>{
  //   return await addNotice(params)
  // }
  // const getNoticeItem = async (params)=>{
  //   return await getNotice(params)
  // }
  // const removeNoticeItem = async (params)=>{
  //   return await removeNotice(params)
  // }
  // const updateNoticeItem = async (params)=>{
  //   return await updateNotice(params)
  // }

  return {
      getStoreList,
      tableData,
      total,
      getOptionsUserName,
      optionsUserName,
      // addNoticeItem,
      // getNoticeItem,
      // removeNoticeItem,
      // updateNoticeItem
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
