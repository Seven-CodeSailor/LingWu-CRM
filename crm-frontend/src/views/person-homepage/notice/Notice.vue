<!-- <template>
  <div>公告通知</div>
</template> -->

<template>
  <div class="notice">
    <div>{{ noticeStore.str }}</div>
    <BaseDataList
      title="公告通知" 
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="true"
      :page-sizes="[5, 10, 15]"
      :total="stockStorageDetailsStore.tableTotal"
      :table-data="noticeStore.data"
      :useDropdownMenu="true"
   
      @update-table-data="  
        (pageSize, currentPage) =>
          getStockStorageList({
            pageSize,
            pageIndex: currentPage
          })
      "
      ref="baseDataListRef"
    >
    <!-- 测试区域 -->
    <!-- <template>
      <el-button text @click="open">Click to open Message Box</el-button>
    </template> -->

    <!-- 测试区域  -->
      <template #menu>
        <div class="menu">
          <div class="left">
            <el-button 
              type="success" 
              style="margin-right: 10px;"
              @click="open"
            >
              <el-icon> 
                <icon-Plus /> 
              </el-icon>
              添加
            </el-button>
            <BulkOPe
              :excelData="() => tableData"
              :getOpt="() => [0]"
              excelName="库存清单.xlsx"
              tableName="库存清单的sheet表"
            >
            </BulkOPe>
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="输入关键字搜索"
              style="margin-right: 4px; width: auto;"
              
            />
            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="searchDetails"
            >
              <el-icon style="margin-right: 4px"> <icon-search /> </el-icon>
              搜索
            </el-button>
          </div>
        </div>
      </template>
      <template #ico>
        <el-icon> 
          <icon-BellFilled /> 
        </el-icon>
      </template>
    </BaseDataList>
  </div>
</template>


<script setup>
import { ref, onMounted  } from 'vue'
import BaseDataList from '@/views/person-homepage/notice/BaseDataList_refresh.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import { useStockStorageDetailsStore } from '@/stores/inventory/stockstoragedetails.js'
// --------------测试区域
import { ElMessage, ElMessageBox } from 'element-plus'
import { useNotice } from '../../../stores/inventory/notice'

const noticeStore = useNotice()
const open = () => {
  ElMessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: 'Invalid Email',
  })
    .then(({value}) => {
      ElMessage({
        type: 'success',
        message: `Your email is: ${value}`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Input canceled',
      })
    })
}
// --------------


import useLayOutSettingStore from '@/stores/setting.js'
const layOutSettingStore = useLayOutSettingStore()
// 刷新按钮回调
const updateRefsh = () => {
  window.location.reload();
  // layOutSettingStore.refsh = !layOutSettingStore.refsh
}


const tableColumnAttribute = [
  {
    prop: 'headline',
    label: '标题'
  },
  {
    prop: 'publishing_content',
    label: '发布内容',
  },
  {
    prop: 'publisher',
    label: '发布人'
  },
  {
    prop: 'release_time',
    label: '发布时间'
  },
  {
    prop: 'status',
    label: '状态',
    useTag:true
  },
  {
    prop: 'recipient',
    label: '接收人'
  }
  // {
  //   prop: 'operate',
  //   label: '操作'
  // }
  
]
const baseDataListRef = ref(null)
const inputValue = ref('')

const stockStorageDetailsStore = useStockStorageDetailsStore()

const searchDetails = () => {
  console.log('t', stockStorageDetailsStore.tableData)
  if (!inputValue.value) {
    ElMessage.error('输入不能为空')
  } else {
    console.log('pp', baseDataListRef.value.paginationData)
    baseDataListRef.value.paginationData.pageSize = 5
    baseDataListRef.value.paginationData.currentPage = 1
    // 搜索数据的时候就重新初始化页面容量和当前页的页码
    const params = {
      pageSize: 5,
      pageIndex: 1
      // 如何知道我输入的是sku名称或商品名
    }
    getStockStorageList(params)
  }
}
const getStockStorageList = async (params) => {
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  await stockStorageDetailsStore.getTableData(params)
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
}

const topInputValue = ref('')
const bottomInputValue = ref('')
const handleSearch = () => {
  console.log('调用search函数')
}

onMounted(() => {
  const params = {
    pageIndex: 1,
    pageSize: 5
  }
  getStockStorageList(params)
  noticeStore.getData()
})
</script>


<style lang="scss" scoped>
.notice {
  width: 100%;
  height: 100%;
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .left {
      height: 40px;
    }
    .right {
      height: 40px;
      display: flex;
      align-items: center;
    }
    .el-button {
      margin-left: 10px;
    }
  }
}
// 表格里的内容换行用
:deep(.el-table .cell) {
  white-space: pre-wrap;
}
</style>


