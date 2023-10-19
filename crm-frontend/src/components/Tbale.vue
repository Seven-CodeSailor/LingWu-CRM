<script>
// 这是表格组件 create by 暮秋pro
// 更新时间：23/10/19
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(10)
    return {
      count
    }
  }
}
</script>

<template>
  <div>{{ count }}</div>
</template>
