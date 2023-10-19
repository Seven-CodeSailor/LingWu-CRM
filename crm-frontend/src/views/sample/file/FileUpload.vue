<template>
  <el-upload
    action="no-action"
    :show-file-list="false"
    :http-request="uploadUseFormData"
  >
    <el-button size="small" type="primary">
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
    <el-button size="small" type="primary">
      <el-icon style="vertical-align: middle">
        <icon-upload />
      </el-icon>
      <span style="vertical-align: middle">Stream上传文件</span>
    </el-button>
  </el-upload>
  <!-- 测试 -->
  <BaseDataList
    :title="sendData.title"
    :msg="sendData.msg"
    :table-column-attribute="sendData.tableColumnAttribute"
    :use-dropdown-menu="sendData.useDropdownMenu"
    :handle-delete="sendData.handleDelete"
    :handle-edit="sendData.handleEdit"
    :table-data="sendData.tableData"
    :dropdown-menu-actions-info="sendData.dropdownMenuActionsInfo"
    ref="baseDataListRef"
  >
    <template #menu>
      <div>
        插槽区<el-icon> <icon-question /></el-icon>
      </div>
    </template>
  </BaseDataList>
  <button @click="get">get</button>
</template>

<script setup>
import Request from '@/apis/request'
import { ElMessage } from 'element-plus'
import BaseDataList from '../../../components/BaseDataList.vue'
import { onMounted, ref } from 'vue'
// 使用FormData的方式上传文件
function uploadUseFormData(params) {
  // 执行文件上传
  Request.postFile(
    '/file/upload',
    {
      nickname: '小米',
      age: 18,
      file: params.file
    },
    { baseURL: 'http://localhost:8090' }
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
    '/user/modify-user?nickname=莉莉丝&age=10',
    params.file,
    (res) => {
      console.log(res)
      ElMessage.success('上传成功')
    },
    (err) => {
      console.log(err)
      ElMessage.error('上传失败')
    },
    { baseURL: 'http://localhost:8090' }
  )
}

// 测试数据传递

const sendData = {
  title: '标题标题测试',
  msg: '一些操作说明',
  tableColumnAttribute: [
    {
      prop: 'sex',
      label: '性别'
    },
    {
      prop: 'age',
      label: '年龄'
    },
    {
      prop: 'hoby',
      label: '爱好'
    }
  ],
  tableData: [
    {
      sex: '男',
      age: 19,
      hoby: '唱歌'
    },
    {
      sex: '女',
      age: 19,
      hoby: 'rap'
    },
    {
      sex: '男',
      age: 19,
      hoby: '篮球'
    }
  ],
  useDropdownMenu: false,
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 下拉菜单
  dropdownMenuActionsInfo: [
    {
      command: 'delete',
      handleAction: (row) => {
        console.log('删除的回调函数', row)
      },
      actionName: '删除'
    },
    {
      command: 'edit',
      handleAction: (row) => {
        console.log('修改的回调函数', row)
      },
      actionName: '修改'
    },
    {
      command: 'add',
      handleAction: (row) => {
        console.log('添加的回调函数', row)
      },
      actionName: '添加'
    }
  ]
}

const get = () => {
  console.log('bbb', baseDataListRef.value.rows)
}
const baseDataListRef = ref(null)
onMounted(() => {
  console.log('bbb', baseDataListRef.value.rows)
})
</script>

<style scoped>
.wrap-space {
  padding: 5px;
}

</style>
