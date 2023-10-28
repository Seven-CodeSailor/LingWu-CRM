<template>
  <el-dialog v-model="dialogVisible" title="文件上传" width="40%">
    <slot></slot>
    <el-upload
      action="no-action"
      :show-file-list="false"
      :http-request="uploadUseFormData"
    >
      <el-button size="default" type="primary">
        <el-icon style="vertical-align: middle">
          <icon-upload />
        </el-icon>
        <span style="vertical-align: middle">FormData上传文件</span>
      </el-button>
    </el-upload>
    <div class="wrap-space"></div>
    <el-upload
      ref="upload"
      action="no-action"
      :show-file-list="false"
      :http-request="uploadUseStream"
    >
      <el-button size="default" type="primary">
        <el-icon style="vertical-align: middle">
          <icon-upload />
        </el-icon>
        <span style="vertical-align: middle">Stream上传文件</span>
      </el-button>
    </el-upload>
  </el-dialog>
</template>

<script setup>
import Request from '@/apis/request'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

/**
 * 组件使用：
 *    <FileUpload ref="file" :StreamPath="StreamPath" :baseURL="baseURL">
 *      <slot name="file"></slot>
 *    </FileUpload>
 *
 * 传入数据(父向子传递)：
 *    // FormData文件上传的路径
 *    path: {
 *      type: String,
 *      required: true
 *    },
 *    // Stream文件上传的路径
 *    StreamPath: {
 *      type: String,
 *      required: true
 *    },
 *    // 地址+端口号
 *    baseURL: {
 *      type: String,
 *      required: true
 *    }
 *
 * 传出数据(子向父传递):
 *    一个默认插槽，为内容区域，可用于进一步确认表格数据
 *
 *    获取组件实例，即ref="file"(file可自定名称)，父组件需要有一个事件来将弹框显示出来
 *    参考：
 *        <el-dropdown-item @click="openFileUpload">批量导入</el-dropdown-item>
 *        // 打开导入弹窗
 *        const openFileUpload = () => {
 *          file.value.showDialog()
 *        }
 */

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  StreamPath: {
    type: String,
    required: true
  },
  baseURL: {
    type: String,
    required: true
  }
})
// 使用FormData的方式上传文件
function uploadUseFormData(params) {
  // 执行文件上传
  Request.postFile(
    props.path, //'/file/upload'
    {
      nickname: '小米',
      age: 18,
      file: params.file
    },
    { baseURL: props.baseURL } //'http://localhost:8090'
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

// 使用Stream方式上传
function uploadUseStream(params) {
  // 执行文件上传
  Request.postFileStream(
    props.StreamPath, //'/user/modify-user?nickname=莉莉丝&age=10'
    params.file,
    (res) => {
      console.log(res)
      ElMessage.success('上传成功')
    },
    (err) => {
      console.log(err)
      ElMessage.error('上传失败')
    },
    { baseURL: props.baseURL }
  )
}

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
