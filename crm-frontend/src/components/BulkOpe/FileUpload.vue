<template>
  <el-dialog v-model="dialogVisible" title="文件上传" width="40%">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="no-action"
      multiple
      :on-change="props.handleChange"
      :limit="1"
      :on-exceed="handleExceed"
      :http-request="uploadUseFormData"
      :show-file-list="false"
    >
      <el-button type="primary">点击上传文件</el-button>
      <template #tip>
        <div class="el-upload__tip">请上传excel格式的文件</div>
      </template>
    </el-upload>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="importExcel">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import Request from '@/apis/request'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const props = defineProps({
  // https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15
  action: {
    type: String,
    required: true
  },
  baseURL: {
    type: String,
    required: true
  },
  importExcel: {
    type: Function,
    required: true
  },
  // 微调冰雾
  handleChange: {
    type: Function
  }
})
// 显示已上传文件，格式{name: '', url: ''}
const fileList = ref([])
function uploadUseFormData(params) {
  // 执行文件上传
  Request.postFile(
    props.action,
    {
      nickname: fileList.value[0].name,
      file: params.file
    },
    { baseURL: props.baseURL }
  )
    .then((res) => {
      console.log(res)
      ElMessage.success('上传成功')
    })
    .catch((res) => {
      console.log(res)
      ElMessage.error('上传失败')
    })
}

// 控制dialog是否显示
let dialogVisible = ref(false)

const importExcel = () => {
  props.importExcel(fileList)
  fileList.value = []
  dialogVisible.value = false
}

const showDialog = () => {
  dialogVisible.value = true
}

defineExpose({ showDialog })
</script>

<style scoped>
.wrap-space {
  padding: 5px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
