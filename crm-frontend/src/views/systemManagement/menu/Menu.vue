<template>
  <div class="container">
    <div class="app-container">
      <el-row>
        <el-col :span="5">
          <el-card>
            <div><h3>菜单管理</h3></div>
            <el-tree
              :data="sendTreeData"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="18">
          <BaseDataList
            :msg="sendData.msg"
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
                  <el-button @click="handleAdd">添加</el-button>
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
            <el-form-item label="中文栏目名称" prop="zhongwen"
              ><el-input
                placeholder="请输入中文栏目名称"
                v-model="editFormData.zhongwen"
              ></el-input
            ></el-form-item>
            <el-form-item label="英文栏目名称" prop="yingwen"
              ><el-input
                placeholder="请输入英文栏目名称"
                v-model="editFormData.yingwen"
              ></el-input
            ></el-form-item>
            <el-form-item label="超链接地址" prop="lianjie"
              ><el-input
                placeholder="请输入超链接地址"
                v-model="editFormData.lianjie"
              ></el-input
            ></el-form-item>
            <el-form-item label="父级栏目" prop="fuji">
              <el-select
                v-model="editFormData.fuji"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in sendTreeData"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="shifouqiyong">
              <el-checkbox
                v-model="editFormData.shifouqiyong"
                size="large"
              ></el-checkbox>
            </el-form-item>
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
        <h3>栏目添加</h3>
      </template>
      <template #default>
        <div>
          <el-form
            v-model="addFormData"
            ref="addDrawerRef"
            :model="addFormData"
          >
            <el-form-item label="中文栏目名称" prop="zhongwen"
              ><el-input
                placeholder="请输入中文栏目名称"
                v-model="addFormData.zhongwen"
              ></el-input
            ></el-form-item>
            <el-form-item label="英文栏目名称" prop="yingwen"
              ><el-input
                placeholder="请输入英文栏目名称"
                v-model="addFormData.yingwen"
              ></el-input
            ></el-form-item>
            <el-form-item label="超链接地址" prop="lianjie"
              ><el-input
                placeholder="请输入超链接地址"
                v-model="addFormData.lianjie"
              ></el-input
            ></el-form-item>
            <el-form-item label="父级栏目" prop="fuji">
              <el-select
                v-model="addFormData.fuji"
                class="m-2"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in sendTreeData"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="shifouqiyong">
              <el-checkbox
                v-model="addFormData.shifouqiyong"
                size="large"
              ></el-checkbox>
            </el-form-item>
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
import useSysMenu from '@/stores/sysManage/menu.js'
import { Refresh, Search } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
const $store = useSysMenu()

onMounted(() => {
  $store.init()
})
const addFormData = reactive({
  zhongwen: '',
  yingwen: '',
  lianjie: '',
  fuji: '',
  shifouqiyong: false
})

const editFormData = reactive({
  zhongwen: '',
  yingwen: '',
  lianjie: '',
  fuji: '',
  shifouqiyong: false
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
  console.log('当前的row，数据不够', row)
  //mock一点数据回填
  editFormData.zhongwen = '中文'
  editFormData.yingwen = 'en'
  editFormData.lianjie = 'sayoriqwq.site'
  editFormData.fuji = '1'
  editFormData.shifouqiyong = true
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
