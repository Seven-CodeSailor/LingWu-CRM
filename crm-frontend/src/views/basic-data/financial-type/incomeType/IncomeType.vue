<template>
  <div class="IncomeType">
    <Tree
      :data="incomeTypeStore.treeData"
      @append="handleAdd"
      @remove="handleRemove"
      @submit="handleSubmit"
      @edit="handleEdit"
      ref="treeRef"
    >
      <template #header>
        <div class="content">
          <div class="left">
            <el-icon style="margin-right: 6px"><icon-message-box /></el-icon
            ><span style="font-size: 18px">费用收入类型</span>
          </div>
          <div class="right">
            <el-button
              type="primary"
              @click="
                () => {
                  treeRef.isEdit = false
                  treeRef.showDrawer = true
                }
              "
              >添加</el-button
            >
          </div>
        </div>
      </template>
      <template #form1>
        <el-form :model="data">
          <el-form-item label="分类名称" prop="typeName"
            ><el-input v-model="data.name"></el-input
          ></el-form-item>
          <el-form-item label="父级栏目" prop="parentID">
            <el-tree-select
              v-model="data.parentID"
              :data="incomeTypeStore.treeData"
              :render-after-expand="false"
            />
          </el-form-item>

          <el-form-item label="排位序号" prop="sort"
            ><el-input v-model="data.sort"></el-input
          ></el-form-item>

          <el-form-item label="是否启用" prop="visible"
            ><el-switch v-model="data.visible"
          /></el-form-item>

          <el-form-item label="描述" prop="intro"
            ><el-input v-model="data.intro" type="textarea"></el-input
          ></el-form-item>
        </el-form>
      </template>
    </Tree>
  </div>
</template>

<script setup>
import Tree from '@/components/Tree/Tree.vue'
import { ref, onMounted } from 'vue'
import { useIncomeTypeStore } from '@/stores/basic-data/financial-type/incometype'
const incomeTypeStore = useIncomeTypeStore()
const treeRef = ref(null)

const data = ref({
  name: '',
  parentID: 1,
  sort: '',
  visible: true,
  intro: ''
})
const initData = ref({
  name: '',
  parentID: '',
  sort: '',
  visible: true,
  intro: ''
})

const getTreeData = async () => {
  await incomeTypeStore.queryAllFeeincomeItem()
}

const handleAdd = (node) => {
  data.value = initData.value
  treeRef.value.isEdit = false
  treeRef.value.showDrawer = true
  console.log('add', node)
}

const handleRemove = (node) => {
  console.log('remove', node)
}

const handleEdit = (node) => {
  console.log('node')
  treeRef.value.isEdit = true
  treeRef.value.showDrawer = true
  node.visible = node.visible ? true : false
}

const handleSubmit = () => {
  console.log('submit')
}

onMounted(async () => {
  await getTreeData()
})
</script>

<style lang="scss" scoped>
.IncomeType {
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .left {
      display: flex;
      align-items: center;
    }
  }
}
</style>
