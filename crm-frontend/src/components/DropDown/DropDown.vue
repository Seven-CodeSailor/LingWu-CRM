<template>
  <!-- // 此组件的输入框的数目不是动态的  只有两个输入框 -->
  <div class="drop_down">
    <el-dropdown trigger="click" ref="dropdownRef" @visible-change="clearValue">
      <el-button type="primary">
        <el-icon><icon-caret-bottom /></el-icon>
      </el-button>
      <template #dropdown>
        <el-form>
          <!-- 顶部输入框 -->
          <el-form-item>
            <div style="padding: 0 10px">
              <h4 style="font-weight: 700; margin-bottom: 2px; color: #909399;height: 26px;">
                {{ props.topInputTitle }}
              </h4>
              <el-input v-model="topInputValue" :placeholder="'搜索' + props.topInputTitle"
                @input="emits('update:topInputValue', topInputValue)" />
            </div>
          </el-form-item>
          <!-- 底部输入框 -->
          <el-form-item>
            <div style="padding: 0 10px">
              <h4 style="font-weight: 700; margin-bottom: 2px; color: #909399;height: 26px;">
                {{ props.bottomInputTitle }}
              </h4>
              <el-input v-model="bottomInputValue" :placeholder="'搜索' + props.bottomInputTitle"
                @input="emits('update:bottomInputValue', bottomInputValue)" />
            </div>
          </el-form-item>
          <!-- 搜索按钮 -->
          <el-form-item>
            <div style="
                padding: 10px;
                display: flex;
                justify-content: flex-end;
                width: 100%;
              ">
              <el-button type="primary" @click="search">搜索</el-button>
            </div>
          </el-form-item>
        </el-form>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
// 此组件的输入框的数目不是动态的  只有两个输入框
import { ref } from 'vue'
const props = defineProps({
  topInputValue: {
    type: String,
  },
  bottomInputValue: {
    type: String,
  },
  topInputTitle: {
    type: String,
    default: '顶部输入框标题的默认值'
  },
  bottomInputTitle: {
    type: String,
    default: '底部输入框标题的默认值'
  }
})
const clearValue = () => {
  topInputValue.value = bottomInputValue.value = ''
}
const topInputValue = ref('')
const bottomInputValue = ref('')
const dropdownRef = ref(null)
// handleSearch  用于调用父组件的搜索函数
const emits = defineEmits(['update:topInputValue'], ['update:bottomInputValue'], ['handleSearch'])
const search = () => {
  if ((!topInputValue.value) && (!bottomInputValue.value)) {
    ElMessage.error('输入不能为空')
  } else {

    emits('handleSearch')
    // 调用搜索函数后 关闭下拉菜单
    dropdownRef.value.$el.click()
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  margin-bottom: 0;
}
</style>
