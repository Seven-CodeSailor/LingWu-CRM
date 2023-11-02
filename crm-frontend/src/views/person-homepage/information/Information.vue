<template>
  <div class="information">
    <el-card>
      编辑资料
      <el-form
        :model="form"
        label-width="120px"
        style="margin-top: 50px"
        ref="ruleFormRef"
        :rules="rules"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
      <div class="avatar">
        <el-form-item label="更换头像">
          <el-upload :auto-upload="false" class="avatar-uploader" :show-file-list="false">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>

          <el-button type="primary" :icon="Plus">选择图片</el-button>
          <el-button type="success" :icon="Upload">上传头像</el-button>
        </el-form-item>
      </div>
      <div class="intro" inline>
        <el-form-item label="姓名" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 20%" />
        </el-form-item>
        <el-form-item label="身份" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>
        <el-form-item label="性别" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>
        <el-form-item label="简介" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>
      </div>
       
        <el-form-item label="地址" prop="oldPassword">
          <el-input v-model="form.oldPassword" style="width: 30%" />
        </el-form-item>
        <el-form-item label="QQ" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="newPassword">
          <el-input v-model="form.newPassword" style="width: 30%" />
        </el-form-item>

        <el-form-item label="固定电话" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>

        <el-form-item label="电话号码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" style="width: 50%" />
        </el-form-item>

        <!-- 底部按钮 -->
        <el-form-item style="margin-top: 44px">
          <el-button type="primary" @click="submitForm">保存密码</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

// 更换头像
const imgUrl = ref('')

const form = ref({
  oldPassword: '', //旧密码
  newPassword: '', //新密码
  confirmPassword: '' //再次确认新密码
})
//校验规则
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

<style lang="scss" scoped>

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
