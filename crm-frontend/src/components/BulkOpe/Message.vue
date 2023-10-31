<template>
  <el-dialog v-model="dialogVisible" :title="props.title" width="40%">
    <el-form>
      <el-form-item label="消息标题"
        ><el-select v-model="value" class="m-2" placeholder="请选择消息标题">
          <el-option label="节日祝福" value="节日祝福" />
          <el-option label="新品推荐" value="新品推荐" />
          <el-option label="预约提醒" value="预约提醒" />
        </el-select>
      </el-form-item>
      <el-form-item label="简单描述">
        <el-input v-model="desc" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="props.exportFile" class="btn"
      >发送</el-button
    >
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  choose: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
let desc = ref('')
// 控制dialog是否显示
let dialogVisible = ref(false)

const showDialog = () => {
  dialogVisible.value = true
}

defineExpose({ showDialog })
</script>

<style scoped>
.wrap-space {
  padding: 5px;
}
</style>
