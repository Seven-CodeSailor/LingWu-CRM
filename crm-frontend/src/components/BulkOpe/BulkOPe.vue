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
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Excel :getData="getData" ref="excel">
    <slot name="excel"></slot>
  </Excel>
  <FileUpload ref="file">
    <slot name="file"></slot>
  </FileUpload>
  <Print ref="print">
    <slot name="print"></slot>
  </Print>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import Excel from '@/components/BulkOpe/Excel.vue'
import FileUpload from '@/components/BulkOpe/FileUpload.vue'
import Print from '@/components/BulkOpe/Print.vue'

/**
 * 组件使用：
 *    <BulkOPe :excelData="excel" :getOpt="() => [0, 1, 2]">
 *      <template #excel>
 *      </template>
 *      <template #file>
 *      </template>
 *      <template #print>
 *      </template>
 *    </BulkOPe>
 *
 * 传入数据(父向子传递)：
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
  }
})

const excel = ref()

const file = ref()

const print = ref()

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

const getData = () => {
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
