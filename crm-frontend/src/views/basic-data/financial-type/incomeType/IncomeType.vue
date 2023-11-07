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
            ><el-input v-model="data.typeName"></el-input
          ></el-form-item>
          <el-form-item label="父级栏目" prop="upTypeName">
            <el-select v-model="data.upTypeName" placeholder="请选择分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import { ref, onMounted, onBeforeMount } from 'vue'
import { useIncomeTypeStore } from '@/stores/basic-data/financial-type/incometype'
const incomeTypeStore = useIncomeTypeStore()
const treeRef = ref(null)

const data = ref({
  typeName: '',
  upTypeName: '',
  sort: '',
  visible: true,
  intro: ''
})
const initData = ref({
  typeName: '',
  upTypeName: '',
  sort: '',
  visible: true,
  intro: ''
})
const data1 = ref({
  typeName: '鸡',
  upTypeName: '鸡蛋',
  sort: 99,
  visible: true,
  intro: '我是ikun你记住'
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
  data.value = data1.value
  treeRef.value.isEdit = true
  treeRef.value.showDrawer = true
  console.log('edit', node)
}

const handleSubmit = () => {
  console.log('submit')
}

const treeData = ref([])

const options = [
  {
    value: 'Option1',
    label: 'Option1'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
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
