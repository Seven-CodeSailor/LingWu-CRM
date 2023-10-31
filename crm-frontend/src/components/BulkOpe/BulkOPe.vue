<template>
  <el-dropdown>
    <el-button type="primary">
      批量操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openExcle" v-if="opt.includes(0)"
          >批量导出</el-dropdown-item
        >
        <el-dropdown-item @click="openFileUpload" v-if="opt.includes(1)"
          >批量导入</el-dropdown-item
        >
        <el-dropdown-item @click="openPrint" v-if="opt.includes(2)"
          >打印表格</el-dropdown-item
        >
        <el-dropdown-item @click="openMsg" v-if="opt.includes(3)"
          >批量发短信</el-dropdown-item
        >
        <el-dropdown-item @click="openMsg" v-if="opt.includes(4)"
          >批量发邮件</el-dropdown-item
        >
        <el-dropdown-item @click="openDes" v-if="opt.includes(5)"
          >批量删除</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Excel
    :getData="getData"
    ref="excel"
    :tableName="tableName"
    :excelName="excelName"
  >
    <slot name="excel"></slot>
  </Excel>
  <FileUpload
    ref="file"
    :path="path"
    :StreamPath="StreamPath"
    :baseURL="baseURL"
  >
    <slot name="file"></slot>
  </FileUpload>
  <Print ref="print">
    <slot name="print"></slot>
  </Print>
  <Message ref="message">
    <slot name="message"></slot>
  </Message>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import Excel from '@/components/BulkOpe/Excel.vue'
import FileUpload from '@/components/BulkOpe/FileUpload.vue'
import Print from '@/components/BulkOpe/Print.vue'
import Message from '@/components/Bulkope/Message.vue'

/**
 * 组件使用：
 *    <BulkOPe :excelData="excel" :getOpt="() => [0, 1, 2]" path="/file/upload" baseURL="http://localhost:8090">
 *      <template #excel>
 *      </template>
 *      <template #file>
 *      </template>
 *      <template #print>
 *      </template>
 *    </BulkOPe>
 *
 * 传入数据(父向子传递)：
 *   1 :excelData="excel"
 *    const excel = () => {
 *      // data为数组类型，数组里面存放多个对象，对象内部存放多个键值对，键为属性名，值为具体属性
 *      let data = [
 *        {
 *          key: value,
 *          ......
 *        },
 *        ......
 *      ]
 *      // 网络请求获取数据
 *      // 将数据存到pinia
 *      // 从pinia里面拿到数据
 *      return data
 *    }
 *
 *   2 :getOpt="() => [0, 1, 2]"
 *    给getOpt传递一个函数，函数返回值为一个数组，数组取值范围为0，1，2。0表示启用批量导出，1表示启用批量导入，2表示启用打印表格
 *   3  path    FormData上传文件的路径,为字符串类型，启用批量导入时才需要传该参数，参考'/file/upload'
 *   4  StreamPath    Stream上传文件的路径,为字符串类型，启用批量导入时才需要传该参数，参考'/user/modify-user?nickname=莉莉丝&age=10'
 *   5  baseURL    上传文件的主机名+端口，启用批量导入时才需要传该参数，
 *
 * 传出数据(子向父传递)：无
 */

const props = defineProps({
  excelData: {
    type: Function,
    default: () => {
      return []
    }
  },
  getOpt: {
    type: Function,
    default: () => {
      return [0, 1, 2]
    }
  },
  // 批量导入操作的 路径 和 主机名+端口
  path: {
    type: String
  },
  baseURL: {
    type: String
  },
  StreamPath: {
    type: String
  },
  tableName: {
    type: String,
    default: 'Data'
  },
  excelName: {
    type: String,
    default: 'SheetJSVueAoO.xlsx'
  }
})

const excel = ref()

const file = ref()

const print = ref()

const message = ref()

let opt = ref([])

onMounted(() => {
  opt.value = props.getOpt()
})

// 打开导出弹窗
const openExcle = () => {
  excel.value.showDialog()
}
// 打开导入弹窗
const openFileUpload = () => {
  file.value.showDialog()
}
// 打开打印弹窗
const openPrint = () => {
  print.value.showDialog()
}
// 打开发送邮件或者发送短信弹窗
const openMsg = () => {
  message.value.showDialog()
}
// 批量删除的方法
const openDes = () => {
  // 发送请求
  console.log('批量删除')
}

// 获取表格所需的数据
const getData = () => {
  console.log(props.excelData())
  return props.excelData()
}
</script>

<style lang="scss" scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
