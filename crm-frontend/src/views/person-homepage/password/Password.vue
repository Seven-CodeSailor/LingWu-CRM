<template>
  <div class="password">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
        </div>
      </template>
      <div class="card-body">
        <el-form
          :model="form"
          label-width="120px"
          style="margin: 18px 40px"
          ref="ruleFormRef"
          :rules="rules"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              placeholder="请输入之前登录密码"
              style="width: 30%"
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="form.newPassword"
              placeholder="请输入新的登录密码"
              style="width: 30%"
            />
          </el-form-item>
          <el-form-item label="密码确认" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              placeholder="请再次输入新的登录密码"
              style="width: 50%"
            />
          </el-form-item>
          <el-form-item style="margin-top: 44px">
            <el-button type="primary" @click="submitForm">保存密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  oldPassword: '', //旧密码
  newPassword: '', //新密码
  confirmPassword: '' //再次确认新密码
})

//表单校验规则
const rules = {
  oldPassword: [
    {
      required: true,
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  newPassword: [
    {
      required: true,
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ]
}

//提交按钮的反馈逻辑
const submitForm = () => {
  ElMessage({
    message: '修改成功',
    type: 'success'
  })
}

//两次密码需要相同的校验
</script>

<style lang="scss" scoped></style>
