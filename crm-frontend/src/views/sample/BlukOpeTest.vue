<template>
  <BulkOPe :excelData="excel" :getOpt="() => [0, 1, 2]">
    <template #excel>
      <div>下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect></div>
    </template>
  </BulkOPe>
</template>

<script setup>
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
const excel = () => {
  return [
    {
      性别: '男',
      年龄: '19',
      爱好: '唱',
      name: 'a'
    },
    {
      性别: '女',
      年龄: '21',
      爱好: 'rap',
      address: 'b'
    },
    {
      性别: '男',
      年龄: '22',
      爱好: '篮球',
      habb: 'c'
    }
  ]
}
const changecid = (value) => {
  //发送网络请求获取数据
  console.log(value)
}
</script>

<style lang="scss" scoped></style>
