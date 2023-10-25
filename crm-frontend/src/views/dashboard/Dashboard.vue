<!--
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-19 22:34:52
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-19 22:35:03
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\dashboard\Dashboard.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved. 
-->
<script setup>
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import PopMessage from '@/components/PopMessage/PopMessage.vue'
import DrawerInfo from '@/components/DrawerInfo/DrawerInfo.vue'
import { ref } from 'vue'
// 这是子组件的选中值
const sonSelectValue = ref('')
const getSelect = (value) => {
  console.log('我拿到了你选中的值', value)
  sonSelectValue.value = value
}
// 这是控制抽屉打开关闭的数据
const drawer = ref(false)
const form = ref({
  name: ''
})
</script>
<template>
  <div class="contain">
    <div class="code">主页面</div>
    <div class="info">
      <!-- vue3中, v-model是 @update 和 :modeValue 的简写 -->
      <!-- v-model:cid="cate_id.value" -->
      <ChooseSelect @update:cid="getSelect"></ChooseSelect>
      <div>拿到子组件选中的值:{{ sonSelectValue }}</div>
      <br />
      <PopMessage
        :megObj="{ btn: '增加', mes: '你确认要增加吗？' }"
        @confirm="console.log('父组件监听到子组件点了确认')"
      ></PopMessage>
    </div>
    <DrawerInfo
      :visible="drawer"
      :update:visible="(drawer = false)"
      title="标题"
    >
      <template #default>
        <el-form :model="form" label-width="120px">
          <el-form-item label="属性名">
            <el-input v-model="form.name" placeholder="请输入" />
          </el-form-item>
        </el-form>
      </template>
    </DrawerInfo>
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>
  </div>
</template>

<style lang="css" scoped>
.contain {
  text-align: center;
  padding: 20%;
}
.code {
  font-size: xxx-large;
  font-weight: bold;
  color: #222222;
}
.info {
  font-weight: bold;
  color: dimgray;
}
</style>
