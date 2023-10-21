

<template>
    <TreeMenu :data="data" @setShow="setShow" />
  </template>
  
  
  <script setup>
  import TreeMenu from '@/components/TreeMenu.vue'
  import { ref } from "vue";
  let data = ref([])
  // 第一个参数是数组，第二个是查询条件
  let recursionSetShow = (origin, id) => {
    origin.forEach((item) => {
      if (item.value === id) {
        item.show = !item.show
      } else if (item.childern) {
          recursionSetShow(item.children)
      }
    })
  }
  // 接受子组件给的数据
  let setShow = ({ value }) => {
    recursionSetShow(data.value, value)
  } 
  // 递归函数-添加一个showdata的属性值，控制展开
  let recursionAddShow = (data) => {
  
    return data.map(item => {
      // false 收起， true 展开
      item.show = false;
      if (item.children) {
        recursionAddShow(item.children)
      }
      return item;
    })
  }
  fetch('/public//template/test-print-tpl.json')
    .then(res => res.json())
    .then(res => {
      // 1.TODO:拿到数据后要先格式化
      data.value = recursionAddShow(res);
    })
  </script>
  