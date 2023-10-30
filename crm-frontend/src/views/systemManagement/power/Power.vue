<template>
  <div class="container">
    <div class="app-container">
      <el-row>
        <el-col :span="5">
          <el-card>
            <div class="space-between">
              <div><h3>权限管理</h3></div>
              <el-button @click="handleRefresh">
                <el-icon>
                  <Refresh />
                </el-icon>
              </el-button>
            </div>
            <el-tree
              :data="sendTreeData"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="18">
          <BaseDataList
            :table-column-attribute="sendData.tableColumnAttribute"
            :table-data="sendData.tableData"
            :handle-delete="handleDelete"
            :handle-edit="handleEdit"
            :use-pagination="sendData.usePagination"
            :page-sizes="sendData.pageSizes"
            :total="sendData.total"
            :use-header="sendData.useHeader"
            :title="sendData.title"
            @update-table-data="get"
            ref="baseDataListRef"
          >
            <template #menu>
              <div class="space-between">
                <div>
                  <el-button @click="handleRefresh">
                    <el-icon>
                      <Refresh />
                    </el-icon>
                    刷新
                  </el-button>
                  <el-button @click="handleAdd">
                    <el-icon><Plus /></el-icon>
                    添加
                  </el-button>
                </div>
                <div class="search">
                  <el-input v-model="searchData" placeholder="搜索"></el-input>
                  <el-button
                    type="primary"
                    :icon="Search"
                    style="margin-left: 10px; padding-left: 10px"
                    @click="handleSearch"
                  >
                    搜索
                  </el-button>
                </div>
              </div>
            </template>

            <template #empty>
              <el-empty class="emptyTable" description="没有数据"></el-empty>
            </template> </BaseDataList
        ></el-col>
      </el-row>
    </div>
    <el-drawer
      v-model="showEditDrawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <template #header>
        <h3>信息</h3>
      </template>
      <template #default>
        <div>
          <el-form v-model="editFormData">
            <el-form-item label="权限名称" prop="mingcheng"
              ><el-input v-model="editFormData.mingcheng"></el-input
            ></el-form-item>
            <el-form-item label="权限描述" prop="miaoshu"
              ><el-input v-model="editFormData.miaoshu"></el-input
            ></el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div class="space-between">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="saveEditData">保存数据</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer
      v-model="showAddDrawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <template #header>
        <h3>添加权限</h3>
      </template>
      <template #default>
        <div>
          <el-form
            v-model="addFormData"
            ref="addDrawerRef"
            :model="addFormData"
          >
            <el-form-item label="权限名称" prop="mingcheng"
              ><el-input v-model="addFormData.mingcheng"></el-input
            ></el-form-item>
            <el-form-item label="权限描述" prop="miaoshu"
              ><el-input v-model="addFormData.miaoshu"></el-input
            ></el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div class="space-between">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="saveAddData">保存数据</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import useSysPower from '@/stores/sysManage/power.js'
import { Refresh, Search, Plus } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
const $store = useSysPower()

onMounted(() => {
  $store.init()
})
const addFormData = reactive({
  mingcheng: '',
  miaoshu: ''
})

const editFormData = ref({
  mingcheng: '',
  miaoshu: ''
})

const searchData = ref('')

const sendData = reactive($store.sendData)
const sendTreeData = $store.sendTreeData
const showAddDrawer = ref(false)
const showEditDrawer = ref(false)

const addDrawerRef = ref()
const handleAdd = () => {
  showAddDrawer.value = true
}

const handleEdit = (row) => {
  showEditDrawer.value = true
  //发请求回填数据
  console.log('当前的row', row)
  editFormData.value = row
}

const handleDelete = (row) => {
  console.log('删除', row)
}

const handleSearch = () => {
  console.log('搜索', searchData.value)
}

const handleRefresh = () => {
  console.log('发请求刷新页面')
  // $store.loadTableData()
}
const saveAddData = () => {
  console.log('带着data', addFormData, '发add请求')
  showAddDrawer.value = false
  //解promise之后:
  ElMessage.success('添加成功')
  console.log('addDrawerRef', addDrawerRef.value)
  addDrawerRef.value.resetFields()
}

const saveEditData = () => {
  console.log('带着data', editFormData, '发edit请求')
  showEditDrawer.value = false
}
const handleClose = (done) => {
  console.log('关闭前的confirm')
  done()
}

const handleNodeClick = (data) => {
  console.log('带着data的id发请求reload列表', data.id)
  // $store.loadTableData()
}
const handleCancel = () => {
  showAddDrawer.value = false
  console.log('取消')
}
const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}
</script>

<style lang="scss" scoped>
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 20px;
}

.search {
  display: flex;
  align-items: center;
}
</style>
