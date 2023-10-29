<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 16:46:05
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-29 18:31:16
 * @FilePath: \zero-one-crmsys\crm-frontend\src\components\Tree\TreeTestView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->

<template>
  <div class="container">
    <div class="app-container">
      <el-card>
        <!-- header -->
        <el-row>header内容</el-row>
        <!-- body -->
        <div class="body">
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="id"
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
            default-expand-all
          >
            <!-- 插槽内容 -->
            <template #default="{ node, data }">
              <div class="tree">
                <span class="left">{{ node.label }}</span>
                <!-- 这个框不知道干嘛的，先预留在这 -->
                <span class="mid"><el-input value="1"></el-input></span>
                <span class="right">
                  <a @click="append(data)"> 增加 </a>
                  <a @click="edit(data)">编辑</a>
                  <a style="margin-left: 8px" @click="remove(node, data)">
                    删除
                  </a>
                  <!-- 第二种处理方式 -->
                  <!-- <a style="margin-left: 8px" @click="remove(data)" v-if="!data.children">
                    删除
                  </a> -->
                </span>
              </div>
            </template>
          </el-tree>
        </div>
      </el-card>
    </div>
    <!-- 这里需要在关闭的时候销毁所有data，否则会因为编辑/新增的状态问题导致回传bug -->
    <!-- 性能不是很好，可以更精确的删除但是太麻烦了 -->
    <el-drawer
      v-model="showDrawer"
      direction="rtl"
      destroy-on-close="true"
      :before-close="handleClose"
    >
      <template #header>
        <h4>{{ isEdit ? '编辑' : '新增' }}</h4>
      </template>
      <template #default>
        <div>这里放表格内容，新增要的那些东西</div>
      </template>
      <template #footer>
        <div style="display: flex; justify-content: space-between">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref } from 'vue'

//抽屉的显示状态
const showDrawer = ref(false)

//抽屉的状态：增加/编辑
const isEdit = ref(false)

//现在使用的id，要保存一份，增加的时候作为pid，编辑的时候就是id
const curId = ref('')
const handleNodeClick = (data) => {
  //这里可以拿到点击时的node数据
  //   console.log(data)
}

//这里默认传过来的data就是树形的，如果不是还需要联系后端协调，处理扁平数组为树形的函数网上也很容易搜到
const data = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1'
          }
        ]
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1'
          }
        ]
      }
    ]
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1'
          }
        ]
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1'
          }
        ]
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

const append = (data) => {
  //改变状态
  isEdit.value = false
  showDrawer.value = true

  //拿到id,这里的id拿来作为新增的数据的父级id
  curId.value = data.id
  //拿到id就为止了，剩下的逻辑在抽屉里的确认时处理
  console.log('append-data', data)
}
const edit = (data) => {
  //改变状态
  isEdit.value = true
  showDrawer.value = true

  //拿到id,这里的id就是编辑的数据用的id
  curId.value = data.id
  //拿到id就为止了，剩下的逻辑在抽屉里的确认时处理
  console.log('edit-data', data)
}
const submit = () => {
  //关闭抽屉
  showDrawer.value = false
  //根据状态发请求
  isEdit.value ? console.log('发edit请求') : console.log('发add请求')
}

//后续再加confirm
const remove = (node, data) => {
  //递归删除数据
  //   const parent = node.parent
  //   const children = parent.data.children || parent.data
  //   const index = children.findIndex((d) => d.id === data.id)
  //   children.splice(index, 1)
  //   data.value = [...data.value]
  //还有一种处理方式，是只允许删除叶子节点，这里就只用处理单点的删除请求
  console.log('remove', node, data)
}

const handleClose = (done) => {
  //取消的钩子函数
  //后续在这里加confim
  done()
}
</script>

<style scoped>
.tree {
  display: flex;
  justify-content: space-between;
}
</style>
