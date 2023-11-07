import { defineStore } from 'pinia'
import { ref } from 'vue'
import {} from '@/apis/basic-data/financial-type/bankaccount.js'
import { queryAllFeeincome } from '@/apis/publicInterface'

function traverseArray(arr) {
  for (const item of arr) {
    if (typeof item === 'object') {
      for (const key in item) {
        if (Array.isArray(item[key])) {
          // 如果属性是数组就继续递归
          traverseArray(item[key])
        } else {
          if (key === 'name') {
            // label 为name
            item.label = item[key]
          }
        }
      }
    }
  }
}
export const useIncomeTypeStore = defineStore('incometype', () => {
  const treeData = ref([
    {
      label: 'Level one qqqqq',
      children: [
        {
          label: 'Level two 2-1',
          children: [
            {
              label: 'Level three 2-1-1'
            }
          ]
        },
        {
          label: 'Level two 2-2',
          children: [
            {
              label: 'Level three 2-2-1'
            }
          ]
        }
      ]
    }
  ])
  const test =
  const queryAllFeeincomeItem = async () => {
    await queryAllFeeincome(
      (res) => {
        treeData.value = [
          {
            label: 'Level one 21111',
            children: [
              {
                label: 'Level two 2-1',
                children: [
                  {
                    label: 'Level three 2-1-1'
                  }
                ]
              },
              {
                label: 'Level two 2-2',
                children: [
                  {
                    label: 'Level three 2-2-1'
                  }
                ]
              }
            ]
          }
        ]
        traverseArray(treeData.value)
      },
      (err) => {
        console.log('err', err)
      }
    )
  }
  return {
    treeData,
    queryAllFeeincomeItem
  }
})
