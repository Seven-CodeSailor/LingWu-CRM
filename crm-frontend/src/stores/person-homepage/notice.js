import { defineStore } from 'pinia'
import { ref } from 'vue'
import { test } from '@/apis/inventory-manager/index.js'
import {list_test}  from "@/apis/personal-homapage/notice.js"
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
            value:'未读',
            tagType:'danger'
        },
        recipient:"小红"
    },
    {
        headline:"雨",
        publishing_content:"哈哈哈",
        publisher:'小明',
        release_time:'2023-1-1',
        status:{
            value:'已查看',
            tagType:'info'
        },
        recipient:"小红"
    }
   ])
   const d1 = ref([])
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
   
   const getD1 = ()=>{
    list_test({},(response)=>{
        console.log('res',response);
    },()=>{

    })
   }

    return {
     data,
     str,
     getData,
     getD1
    }
  }
)

