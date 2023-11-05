import { defineStore } from 'pinia'
import { ref } from 'vue'
import { test } from '@/apis/inventory-manager/index.js'
import { releaseNotice } from '@/apis/personal-homepage/notice.js'

//api接口测试
// export const useNoticeStore = defineStore('notice', () => {
//     const tableData = ref([])
//     const total = ref(0)
//     const getStoreList = async (params) => {
//         console.log('getStoreList', params)
//         .then((res) => {
//             console.log('res', res)
//         })
//         .catch((err) => {
//             console.log('err',err)
//         })
//     }
//     return {
//         tableData,
//         total,
//         getStoreList
//     }
// })

//以下是本地模拟数据，后期会删除
export const useNotice = defineStore('notice', () => {
  let state = ''
  const data = ref([
    {
      headline: '雨',
      publishing_content: '哈哈哈',
      publisher: '小明',
      release_time: '2023-01-01 22:32:19',
      status: {
        value: '未读',
        tagType: 'danger'
      },
      recipient: '小红'
    },
    {
      headline: '雨',
      publishing_content: '哈哈哈',
      publisher: '小明',
      release_time: '2023-01-01 12:29:39',
      status: {
        value: '已查看',
        tagType: 'info'
      },
      recipient: '小红'
    }
  ])
  const d1 = ref([])
  const str = ref('')
  // action 处理state的数据
  const getData = () => {
    test(
      {},
      (response) => {
        console.log('res', response)
        str.value = response.data.data.str
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  const getD1 = () => {
    console.log(111)
    let list_test = () => (
      {},
      (response) => {
        console.log('res', response)
        d1.value = response.data
        // console.log('d1',response.data);
      },
      (error) => {
        console.log('error', error)
      }
    )
  }

  return {
    data,
    str,
    getData,
    getD1,
    d1
  }
})
