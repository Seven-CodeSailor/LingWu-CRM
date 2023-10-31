<template>
  <BaseDataList
    :tableData="$store.sendData.tableData"
    :tableColumnAttribute="$store.sendData.tableColumnAttribute"
    :useHeader="$store.sendData.useHeader"
    :useOperateColumn="$store.sendData.useOperateColumn"
    :usePagination="$store.sendData.usePagination"
  ></BaseDataList>
</template>

<script setup>
import { useCollectionPlan } from '@/stores/fund/collection/collectionPlan.js'
import { onMounted } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
const $store = useCollectionPlan()

onMounted(() => {
  //页面初始化，加载数据
  $store.getCollectionPlanList(1, 10)
})
</script>

<style lang="scss" scoped></style>
