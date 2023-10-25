<template>
  <el-dialog v-model="dialogVisible" title="批量导出" width="40%">
    <slot></slot>
    <el-button type="primary" @click="exportFile" class="btn">导出</el-button>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { utils, writeFileXLSX } from 'xlsx'
/**
 * 组件使用：
 *    // 内部为弹框，需要父组件定义事件触发弹框
 *    <Excel :getData="getData" ref="excel" :tableName="tableName" :excelName="excelName">
 *      <template #default>
 *      </template>
 *    </Excel>
 *
 * 传入数据(父向子传递)：
 *    getData = () => {
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
 *      return data;
 *    }
 *    // 表名
 *    tableName: {
 *      type: String,
 *      required: true
 *    },
 *    //文件名
 *    excelName: {
 *      type: String,
 *      required: true
 *    }
 * 传出数据(子向父传递):
 *    一个默认插槽，为内容区域，可用于进一步确认表格数据
 *
 *    获取组件实例，即ref="excel"(excel可自定名称)，父组件需要有一个事件来将弹框显示出来
 *    参考：
 *        <el-dropdown-item @click="openExcle">批量导出</el-dropdown-item>
 *        // 打开导入弹窗
 *        const openExcle = () => {
 *          excel.value.showDialog()
 *        }
 */

const props = defineProps({
  getData: {
    type: Function,
    required: true,
    default: () => {
      return []
    }
  },
  // 表名
  tableName: {
    type: String,
    required: true
  },
  //文件名
  excelName: {
    type: String,
    required: true
  }
})
// 控制dialog是否显示
let dialogVisible = ref(false)
// 导出数据
const rows = ref([])
/**
 * 挂载的时候加载数据
 */
onMounted(async () => {
  rows.value = props.getData()
})

/* get state data and export to XLSX */
function exportFile() {
  // 1.创建工作表
  // 将json数据转化为sheet单元格
  const ws = utils.json_to_sheet(rows.value)
  console.log('ss', ws)
  // 2.创建工作书
  // 用于加工工作簿
  const wb = utils.book_new()
  // 3。创建工作簿
  // 将ws里的json数据放入工作薄里  命名为Data
  utils.book_append_sheet(wb, ws, props.tableName) //'Data'
  // 导出xlsx数据表文件
  writeFileXLSX(wb, props.excelName) //'SheetJSVueAoO.xlsx'
}

const showDialog = () => {
  dialogVisible.value = true
}

defineExpose({ showDialog })
</script>

<style lang="scss" scoped>
.btn {
  display: block;
  margin-left: 45%;
  margin-top: 25px;
}
</style>
