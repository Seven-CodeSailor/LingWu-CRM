import { defineStore } from 'pinia'
import { ref } from 'vue'
import { test } from '@/apis/inventory-manager/index.js'
import {list_test}  from "@/apis/personal-homapage/notice.js"

export const useNotice = defineStore(
  'notice',
  () => {
state 
   const data = ref([
    {
        headline:"雨",
        publishing_content:"哈哈哈",
        publisher:'小明',
        release_time:'2023-01-01 22:32:19',
        status:
        {
            value:'未读',
            tagType:'danger'
        },
        recipient:"小红",
        // 以下内容引入但没有展示，研究中
        // operations: 
        // {
        //     value: '查看',
        // },
        // {
        //     value: '删除',
        // },
    },
    {
        headline:"雨",
        publishing_content:"哈哈哈",
        publisher:'小明',
        release_time:'2023-01-01 12:29:39',
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
    console.log(111);
    list_test({},(response)=>{
        console.log('res',response);
        d1.value = response.data
        // console.log('d1',response.data);
    },(error)=>{
        console.log('error',error);
    })
   }

    return {
     data,
     str,
     getData,
     getD1,
     d1
    }
  }
)

