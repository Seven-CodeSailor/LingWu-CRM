<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-29 16:46:05
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-29 23:30:31
 * @FilePath: \zero-one-crmsys\crm-frontend\src\components\Tree\TreeTestView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->

<template>
  <div>
    <Tree :data="treeData">
      <template #header>header</template>
      <!-- 这里真的很尬，为了区分状态反而传了两个插槽，我明天优化一下这里 -->
      <template #form1>
        <el-form :model="data1">
          <el-form-item label="名字" prop="name"
            ><el-input v-model="data1.name"></el-input
          ></el-form-item>
          <el-form-item label="年龄" prop="age"
            ><el-input v-model="data1.age"></el-input
          ></el-form-item>
          <el-form-item label="性别" prop="sex"
            ><el-input v-model="data1.sex" type="textarea"></el-input
          ></el-form-item>
        </el-form>
      </template>
      <template #form2>
        <el-form :model="data2">
          <el-form-item label="名字" prop="name"
            ><el-input v-model="data2.name"></el-input
          ></el-form-item>
          <el-form-item label="年龄" prop="age"
            ><el-input v-model="data2.age"></el-input
          ></el-form-item>
          <el-form-item label="性别" prop="sex"
            ><el-input v-model="data2.sex" type="textarea"></el-input
          ></el-form-item>
        </el-form>
      </template>
    </Tree>
  </div>
</template>

<script setup>
import Tree from './Tree.vue'

const data1 = {
  name: 'sayoriqwq',
  age: 18,
  sex: 'male'
}

const data2 = {
  name: '',
  age: '',
  sex: ''
}

const treeData = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1'
          },
          {
            id: 10,
            label: 'Level three 1-1-2'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1'
      },
      {
        id: 6,
        label: 'Level two 2-2'
      }
    ]
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1'
      },
      {
        id: 8,
        label: 'Level two 3-2'
      }
    ]
  }
]
</script>
