<!-- 各标签中的属性还没改动 -->
<template>
  <el-card class="information">
    编辑资料
    <el-form
      :model="form"
      label-width="120px"
      style="margin-top: 40px"
      ref="ruleFormRef"
      :rules="rules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <div class="group1">
        <el-row>
          <el-col :span="7">
            <div class="grid-content ep-bg-purple">
              <el-form-item label="地址" prop="oldPassword">
                <el-input v-model="form.oldPassword" style="width: 400px" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="grid-content ep-bg-purple">
              <el-form-item label="电子邮箱" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" style="width: 300px" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="10">
            <div class="grid-content ep-bg-purple">
              <el-form-item style="">
                <div class="head-avatar">
                  更换头像
                  <el-upload
                    style="
                      margin: 18px 22px;
                      border: 1px #a9b1bc solid;
                      border-radius: 2%;
                    "
                    :auto-upload="false"
                    class="avatar-uploader"
                    :show-file-list="false"
                  >
                    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"
                      ><Plus
                    /></el-icon>
                  </el-upload>
                  <el-button type="primary" :icon="Plus" @click="pickPicture"
                    >选择图片</el-button
                  >
                  <el-button type="success" :icon="Upload" @click="saveUpdate"
                    >上传头像</el-button
                  >
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="10" style="margin-top: -275px"
            ><div class="grid-content ep-bg-purple">
              <el-form-item label="性别" prop="confirmPassword">
                <el-radio-group v-model="form.resource">
                  <el-radio label="男" />
                  <el-radio label="女" />
                </el-radio-group>
              </el-form-item></div
          ></el-col>

          <el-col :span="16" style="margin-top: -230px"
            ><div class="grid-content ep-bg-purple-light">
              <el-form-item label="身份" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" style="width: 224px" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12" style="margin-top: -180px"
            ><div class="grid-content ep-bg-purple-light">
              <el-form-item label="简介" prop="confirmPassword">
                <el-input
                  v-model="form.desc"
                  type="textarea"
                  :rows="4"
                  placeholder="Please input"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="group2">
        <el-row>
          <el-col :span="14" style="margin-top: -70px">
            <div>
              <el-form-item label="固定电话" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" style="width: 224px" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="12" style="margin-top: -20px">
            <div>
              <el-form-item label="姓名" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" style="width: 224px" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="gropu3">
        <el-row>
          <el-col :span="7">
            <div class="grid-content ep-bg-purple">
              <el-form-item label="QQ" prop="oldPassword">
                <el-input v-model="form.oldPassword" style="width: 224px" />
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="7">
            <div class="grid-content ep-bg-purple">
              <el-form-item label="电话号码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" style="width: 400px" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="group4" style="margin-top: 12px">
        <el-row>
          <el-col :span="7">
            <div>
              <el-form-item label="邮政编码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" style="width: 50%" />
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 底部按钮 -->
      <el-form-item style="margin-top: 2px; justify-content: center">
        <el-button type="primary" @click="submitForm">保存密码</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
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
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
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
