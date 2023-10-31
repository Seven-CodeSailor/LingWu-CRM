import { defineStore } from 'pinia'
import { ref } from 'vue'
import { test } from '@/apis/inventory-manager/index.js'
export const useNotice = defineStore(
  'notice',
  () => {
   // state 
   const data = ref([
    {
        headline:"雨",
        publishing_content:"哈哈哈",
        publisher:'小明',
        release_time:'2023-1-1',
        status:{
            value:'已发布',
            tagType:'el'
        },
        recipient:"小红"
    },
    {
        headline:"雨",
        publishing_content:"哈哈哈",
        publisher:'小明',
        release_time:'2023-1-1',
        status:{
            value:'已发布',
            tagType:'success'
        },
        recipient:"小红"
    }
   ])
   const str = ref('')
   // action 处理state的数据
   const getData = ()=>{
        test({},(response)=>{
            console.log('res',response);
            str.value = response.data.data.str
        },(error)=>{
            console.log('error',error);
        })
   }
    //    getter
    // const getData = async (params) => {
    //   await queryStorageDetails(
    //     params,
    //     (res) => {
          
    //     },
    //     (err) => {
    //       console.log('err', err)
    //     }
    //   )
    // }
    return {
     data,
     str,
     getData
    }
  }
)
