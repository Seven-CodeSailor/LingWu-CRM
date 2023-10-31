<template>
  <el-button text @click="open" style="position: absolute; top: -100px">
    系统公告
  </el-button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
onMounted(() => {
  open()
})
let announce = ref('今晚开会')
const open = () => {
  ElMessageBox.alert(announce.value, '系统公告', {
    confirmButtonText: '确定'
  })
}
watch(announce.value, () => {
  open()
})
</script>

<style lang="scss" scoped></style>
