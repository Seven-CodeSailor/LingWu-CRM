<template>
  <div class="Regional">
    <BaseDataList
      title="地区管理"
      :tableColumnAttribute="sendData.tableColumnAttribute"
      :tableData="sendData.tableData"
      :handleDelete="sendData.handleDelete"
      :handleEdit="sendData.handleEdit"
      :total="sendData.total"
      :pageSizes="sendData.pageSizes"
      :usePagination="sendData.usePagination"
    >
      <template #ico>
        <el-icon><icon-message-box /></el-icon>
      </template>
      <!-- 左边树形菜单 -->
      <template #treeMeau>
        <el-card class="card">
          <template #header>
            <div class="card-header">
              <span>地区管理</span>
              <el-button>刷新</el-button>
            </div>
          </template>
          <el-tree
            :data="treeData.treeArr"
            :props="treeData.defaultProps"
            highlight-current="true"
            default-expand-all="true"
            draggable
            empty-text="树形菜单内容为空"
            @node-click="handleNodeClick"
          />
        </el-card>
      </template>
      <template #menu
        ><div class="content">
          <div class="left">
            <el-button type="primary" @click="addArea">添加数据</el-button>
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="请输入搜索名称"
              style="margin: 0 4px; width: 200px"
            />
            <el-button type="primary" style="margin-left: 4px">
              <el-icon style="margin-right: 4px"><icon-search /></el-icon
              >搜索</el-button
            >
          </div>
        </div>
      </template>
    </BaseDataList>
    <RegionalForm
      ref="regionalFormRef"
      :title="title"
      :options="options"
    ></RegionalForm>
  </div>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import RegionalForm from './RegionalForm.vue'
import { ref } from 'vue'
const regionalFormRef = ref(null)
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'areaName',
      label: '地区名称'
    },
    {
      prop: 'areaInfo',
      label: '地区描述'
    },
    {
      prop: 'sort',
      label: '排序',
      sortable: true
    },
    {
      prop: 'visible',
      label: '是否启用',
      useSwitch: true
    }
  ],
  tableData: [
    {
      areaName: '鸡场',
      areaInfo: 'ikun集中营',
      sort: 250,
      visible: false
    },
    {
      areaName: '鸡场',
      areaInfo: 'ikun集中营',
      sort: 251,
      visible: true
    },
    {
      areaName: '鸡场',
      areaInfo: 'ikun集中营',
      sort: 252,
      visible: true
    }
  ],
  // 传入删除操作的函数就会显示删除按钮
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
    regionalFormRef.value.visible = true
    title.value = '修改'
    regionalFormRef.value.form = { ...row }
    // setTimeout(() => {
    //   regionalFormRef.value.chooseSelectRef.selectValue =
    // })
  },
  pageSizes: [5, 10, 15],
  total: 100,
  usePagination: true
}

const treeData = {
  treeArr: [
    {
      label: '鸡窝',
      children: [
        {
          label: '🐓公鸡',
          children: [
            {
              label: '鸡蛋'
            }
          ]
        }
      ]
    }
  ],

  defaultProps: {
    children: 'children',
    label: 'label'
  }
}

const title = ref('')

const addArea = () => {
  title.value = '添加'
  regionalFormRef.value.visible = true
}

const options = ref([
  {
    value: 'Option1',
    label: '选项1'
  },
  {
    value: 'Option2',
    label: '选项2'
  },
  {
    value: 'Option2',
    label: '选项3'
  }
])
</script>

<style lang="scss" scoped>
.Regional {
  .card {
    width: 40%;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
