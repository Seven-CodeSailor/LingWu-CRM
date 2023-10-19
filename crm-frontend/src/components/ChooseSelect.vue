<script>
// 这是下拉选择框 create by 暮秋pro
// 更新时间：23/10/19
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default {
  setup() {
    const count = ref(10)
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
    return {
      count,
      options,
      value,
      input1
    }
  }
}
</script>

<template>
  <div>{{ count }}</div>
  <el-select
    v-model="value"
    class="m-2"
    placeholder="请选择"
    size="large"
    clearable
    effect="dark"
  >
    <!-- 搜索框 -->
    <el-input
      v-model="input1"
      class="w-50 m-2"
      size="default"
      placeholder="请输入"
      :suffix-icon="Search"
    />
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <template #default> </template>
    </el-option>
  </el-select>
</template>

<style></style>
