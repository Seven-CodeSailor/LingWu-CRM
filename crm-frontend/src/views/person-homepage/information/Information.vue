<template>
  <el-card class="information">
    <template #header>
      <div class="card-header">
        <span>编辑资料</span>
      </div>
    </template>
    <div class="card-body">
      <el-form
        style="margin: 22px 40px"
        ref="ruleFormRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div class="group1">
          <el-row>
            <el-col :span="7">
              <div>
                <el-form-item label="地址" prop="address">
                  <el-input v-model="form.address" style="width: 400px" />
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="7">
              <div>
                <el-form-item label="电子邮箱" prop="email">
                  <el-input
                    v-model="form.email"
                    style="width: 300px"
                  />
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="10">
              <div>
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
              ><div>
                <el-form-item label="性别" prop="gender">
                  <el-radio-group v-model="form.gender">
                    <el-radio label="男" />
                    <el-radio label="女" />
                  </el-radio-group>
                </el-form-item></div
            ></el-col>

            <el-col :span="16" style="margin-top: -230px"
              ><div>
                <el-form-item label="身份" prop="identity">
                  <el-input
                    v-model="form.identity"
                    style="width: 204px"
                  />
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12" style="margin-top: -180px"
              ><div>
                <el-form-item label="简介" prop="intro">
                  <el-input
                    v-model="form.intro"
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
                <el-form-item label="固定电话" prop="mobile">
                  <el-input
                    v-model="form.mobile"
                    style="width: 204px"
                  />
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="12" style="margin-top: -20px">
              <div>
                <el-form-item label="姓名" prop="name">
                  <el-input
                    v-model="form.name"
                    style="width: 204px"
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="gropu3">
          <el-row>
            <el-col :span="7">
              <div>
                <el-form-item label="QQ" prop="qicq">
                  <el-input v-model="form.qicq" style="width: 230px" />
                </el-form-item>
              </div>
            </el-col>

            <el-col :span="7">
              <div>
                <el-form-item label="电话号码" prop="tel">
                  <el-input
                    v-model="form.tel"
                    style="width: 400px"
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="group4">
          <el-row>
            <el-col :span="7">
              <div>
                <el-form-item label="邮政编码" prop="zipcode">
                  <el-input v-model="form.zipcode" style="width: 50%" />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>

        <!-- 底部按钮 -->
        <el-form-item >
          <el-button type="primary" @click="submitForm" style="margin-top: 2px;">保存资料</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

// 更换头像
const imgUrl = ref('')

const form = ref({
  address: '', //地址
  email: '', //电子邮箱
  gender: '', //性别
  identity: '', //身份
  intro: '', //简介
  mobile: '', //固定电话
  name: '', //名字
  qicq: '', //QQ
  tel: '', //电话号码
  zipcode: '', //邮政编码

})
//校验规则（全都不是必要项）
const rules = {
  address: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  email: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  gender: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  identity: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  intro: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  name: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  qicq: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  tel: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
  zipcode: [
    {
      pattern: /^\[a-zA-Z0-9]{8,15}$/,
      message: '密码必须是8-15位字母或数字',
      trigger: 'blur'
    }
  ],
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
