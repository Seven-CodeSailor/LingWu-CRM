<script setup>
import { onMounted } from 'vue'

/**
 * dataArr:这是从后端接口拿到的数组对象
 * isSelect: 这是是否给表格添加多选框
 */
const props = defineProps({
  dataArr: {
    type: Array,
    required: true
  },
  isSelect: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  console.log('这是父传子拿到的数组:', props.dataArr)
})
</script>
<template>
  <el-table
    :data="dataArr"
    style="width: 100% hight: 100%;"
    stripe
    height="100%"
  >
    <el-table-column v-if="props.isSelect" type="selection" width="55" />

    <el-table-column
      v-for="(value, key) in props.dataArr[0]"
      :key="key"
      :prop="key"
      :label="key"
      width="180"
    />
    <slot></slot>

    <template #empty>
      <el-empty description="没有数据"></el-empty>
    </template>
  </el-table>
</template>
