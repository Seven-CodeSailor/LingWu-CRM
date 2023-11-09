<template>
  <div class="container">
    <div class="app-container">
      <BaseDataList
        :table-column-attribute="$store.sendData.tableColumnAttribute"
        :table-data="$store.sendData.tableData"
        :handle-delete="handleDelete"
        :handle-edit="handleEdit"
        :use-pagination="$store.sendData.usePagination"
        :page-sizes="$store.sendData.pageSizes"
        :total="$store.sendData.total"
        :use-header="$store.sendData.useHeader"
        :title="$store.sendData.title"
        ref="baseDataListRef"
      >
        <template #ico>
          <el-icon><Operation /></el-icon>
        </template>

        <template #treeMeau>
          <el-card class="tree-card">
            <div class="space-between">
              <div><h3>菜单管理</h3></div>
              <el-button @click="handleRefresh">
                <el-icon>
                  <Refresh />
                </el-icon>
              </el-button>
            </div>
            <el-tree
              :props="defaultProps"
              :data="$store.sendTreeData"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </template>
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
        </template>
      </BaseDataList>
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
            <el-form-item label="中文栏目名称" prop="name"
              ><el-input
                placeholder="请输入中文栏目名称"
                v-model="editFormData.name"
              ></el-input
            ></el-form-item>
            <el-form-item label="英文栏目名称" prop="nameEn"
              ><el-input
                placeholder="请输入英文栏目名称"
                v-model="editFormData.nameEn"
              ></el-input
            ></el-form-item>
            <el-form-item label="链接地址" prop="url"
              ><el-input
                placeholder="请输入链接地址"
                v-model="editFormData.url"
              ></el-input
            ></el-form-item>
            <el-form-item label="父级栏目(点击获取id)" prop="parentID">
              <el-tree-select
                v-model="editFormData.parentID"
                :props="defaultProps"
                :data="$store.sendTreeData"
                @node-click="handleNodeClickForDropDown"
              />
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
            <el-form-item label="父级栏目id" prop="fuji">
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
import { Refresh, Search, Plus, Operation } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
const $store = useSysMenu()

onMounted(() => {
  $store.getSysMenuTree()
})

const defaultProps = {
  children: 'children',
  label: 'name'
}
const addFormData = reactive({
  name: '',
  nameEn: '',
  url: '',
  parentID: ''
})

const editFormData = ref({
  name: '',
  nameEn: '',
  url: '',
  parentID: ''
})

const searchData = ref('')

const showAddDrawer = ref(false)
const showEditDrawer = ref(false)

const addDrawerRef = ref()
const handleAdd = () => {
  showAddDrawer.value = true
}

const handleEdit = async (row) => {
  showEditDrawer.value = true
  //发请求回填数据
  editFormData.value = row
  console.log(row.parentId)
}

const handleDelete = (row) => {
  console.log('删除', row)
}

const handleSearch = () => {
  console.log('搜索', searchData.value)
}

const handleRefresh = () => {
  $store.getSysMenuTree()
  $store.getMenuList(1)
}

const saveAddData = () => {
  console.log('带着data', addFormData, '发add请求')
  showAddDrawer.value = false
  ElMessage.success('添加成功')
  console.log('addDrawerRef', addDrawerRef.value)
  addDrawerRef.value.resetFields()
}

const saveEditData = async () => {
  console.log('带着data', editFormData, '发edit请求')
  showEditDrawer.value = false
  const res = await $store.updateMenu(editFormData.value)
  if (res.code === 10000) {
    ElMessage.success('修改成功')
    $store.getMenuList(editFormData.value.parentID)
  }
}
const handleClose = (done) => {
  console.log('关闭前的confirm')
  done()
}

const handleNodeClick = (data) => {
  $store.getMenuList(data.id)
  console.log('id', data.id)
}

const handleNodeClickForDropDown = (data) => {
  editFormData.value.parentID = data.id
}
const handleCancel = () => {
  showAddDrawer.value = false
  console.log('取消')
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

.tree-card {
  min-width: 200px;
  min-height: 500px;
  width: 300px;
  height: 600px;
  margin-right: 50px;
}
</style>
