<script setup>
import { ref } from 'vue'

// 父传子需要接收的数据
/**
 * visible：控制抽屉的显示与隐藏
 * title：抽屉的标题。
 * formComponent：自定义的表单组件
 * rules：表单的校验规则。
 */
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: '编辑'
  },
  formComponent: {
    type: String,
    required: true
  },
  rules: {
    type: Object,
    default: () => ({})
  }
})

const form = ref({})
const emit = defineEmits('update:visible')

const closeDrawer = () => {
  emit('update:visible', false)
}

// const submitForm = () => {
//   // 校验表单
//   const isValid = validateForm()
//   if (isValid) {
//     console.log('表单校验通过')
//     // 提交表单逻辑
//   }
// }

// const validateForm = () => {
//   return new Promise((resolve, reject) => {
//     const formRef = refs.customForm
//     formRef.validate((valid) => {
//       if (valid) {
//         resolve(true)
//       } else {
//         reject(false)
//       }
//     })
//   })
// }
</script>

<template>
  <el-drawer :visible="props.visible" :title="props.title" @close="closeDrawer">
    <el-form :model="form" :rules="rules" ref="form">
      <!-- 插槽内容 -->
      <slot></slot>

      <!-- 自定义表单组件 -->
      <component
        :is="formComponent"
        v-model="form"
        ref="customForm"
      ></component>

      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </el-drawer>
</template>
