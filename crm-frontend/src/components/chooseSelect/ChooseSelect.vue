<script setup>
// 这是下拉选择框 create by 暮秋pro
// 更新时间：23/10/19
import { onMounted, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

const value = ref('')
const input1 = ref()
// 这是发请求拿到的数据
const options = ref([
  {
    value: 'Option1',
    label: '选项1'
  },
  {
    value: 'Option2',
    label: '选项2'
  }
])
// 从父组件接收的数据
const props = defineProps({
  cid: {
    type: [Number, String]
  }
})
// 定义子传父方法
const emit = defineEmits(['update:cid'])
onMounted(() => {
  console.log('父的数据', props.cid)
})
</script>

<template>
  <el-select
    v-model="value"
    class="m-2"
    placeholder="请选择"
    size="large"
    clearable
    @change="emit('update:cid', value.label)"
  >
    <!-- 搜索框 -->
    <el-input
      v-model="input1"
      class="w-50 m-2 search"
      size="default"
      placeholder="请输入"
      :suffix-icon="Search"
    />
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item"
    >
    </el-option>
  </el-select>
</template>

<style scoped>
.search {
  padding: 5% 5%;
}
</style>
