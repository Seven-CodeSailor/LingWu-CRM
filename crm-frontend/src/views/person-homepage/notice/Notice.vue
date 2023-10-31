<!-- <template>
  <div>公告通知</div>
</template> -->
 
  <!-- 以下是测试代码的页面 -->
<script setup>
import { ref,onMounted } from  'vue'
import { Edit, Delete} from '@element-plus/icons-vue'
import notGetChannelsService from '@/api/utils/notice'
import {useNotice} from '@/stores/person-homepage/notice.js'
import ChannelEdit from '@/components/ChannelEdit'

// import test from '@/api/utils/notice'
// const test = ref([])
const noticeStore = useNotice()
const channelList = ref([])

const loading = red(false)
const dialog = ref()

// const getChannelList = async () => {
//   loading.value = true
//   const res = await notGetChannelsService()
//   channelList.value = res.data.data
//   // channelList.value = ref[]
//   console.log(channelList.value)
//   loading.value = false
// }
// getChannelList()


const onDeleteChannel = (row, $index) => {
  console.log(row, $index)
}
const onEditChannel = (row) => {
  dialog.value.open({})
}

const onAddChannel = () => {
  dialog.value.open({})
}
const onSuccess = () => {
  getChannelList()
}
onMounted(()=>{
  noticeStore.getD1()
})
</script>


<template>
  <page-container title="公告通知">
    <template #icon>
      <el-icon> 
        <icon-BellFilled /> 
      </el-icon>
    </template>
    <template #extra>
      <el-button>刷新</el-button>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <!-- 中间第二行部分 -->
    <template #button>
      <el-button style="margin-bottom: 15px;">
        添加
      </el-button>
      <el-button style="margin-bottom: 15px;" type="primary">
        批量操作
      </el-button>
    </template>
    
    <!-- 表格部分 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%;" >
      <el-table-column type="index" label="序号" style="width: 100;"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" style="width: 150;">
        <!-- row是channelList的一项， $index是下标 -->
        <template #default="{ row ,$index }" >
          <el-button 
          circle 
          type="primary" 
          :icon="Edit"
           @click="onEditChannel(row, $index)"
           >编辑</el-button>
          <el-button 
          circle 
          type="danger" 
          :icon="Delete" 
          @click="onDeleteChannel(row, $index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>


  </page-container>
</template> 

<style lang="scss" scoped>
</style>



