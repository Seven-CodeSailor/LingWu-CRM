<template>
  <el-card class="information">
    <template #header>
      <div class="card-header">
        <span>编辑资料</span>
      </div>
    </template>
    <div class="card-body">
      <el-form
      :model="form"
      label-width="120px"
      style="margin: 18px 20px"
      ref="ruleFormRef"
      :rules="rules"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <div class="card-body">
        <el-form
          :model="form"
          label-width="120px"
          style="margin: 18px 40px"
          ref="ruleFormRef"
          :rules="rules"
        >
          <div class="group1">
            <el-row>
              <el-col :span="7">
                <div class="grid-content ep-bg-purple">
                  <el-form-item label="地址" prop="address">
                    <el-input v-model="form.address" style="width: 400px" clearable />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="7">
                <div class="grid-content ep-bg-purple">
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="form.email" style="width: 300px" clearable />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="10">
                <div class="grid-content ep-bg-purple">
                  <el-form-item>
                    <div class="head-avatar">
                      更换头像
                      <el-upload
                        style="
                          margin: 18px 22px;
                          border: 1px #b6c1d0 solid;
                          border-radius: 2%;
                        "
                        :auto-upload="false"
                        class="avatar-uploader"
                        :show-file-list="false"
                      >
                        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"
                          ><icon-Plus
                        /></el-icon>
                      </el-upload>
                      <el-button type="primary" @click="pickPicture"
                        ><el-icon> <icon-Plus /></el-icon> 选择图片</el-button
                      >
                      <el-button type="success" @click="saveUpdate"
                        ><el-icon> <icon-Upload /></el-icon>上传头像</el-button
                      >
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10" style="margin-top: -275px"
                ><div class="grid-content ep-bg-purple">
                  <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="form.gender">
                      <el-radio label="男" />
                      <el-radio label="女" />
                    </el-radio-group>
                  </el-form-item></div
              ></el-col>

              <el-col :span="16" style="margin-top: -230px"
                ><div class="grid-content ep-bg-purple-light">
                  <el-form-item label="身份" prop="identity">
                    <el-input v-model="form.identity" style="width: 224px" clearable />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="12" style="margin-top: -180px"
                ><div class="grid-content ep-bg-purple-light">
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
                    <el-input v-model="form.mobile" style="width: 224px" clearable />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="12" style="margin-top: -20px">
                <div>
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" style="width: 204px" clearable />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="gropu3">
            <el-row>
              <el-col :span="7">
                <div class="grid-content ep-bg-purple">
                  <el-form-item label="QQ" prop="qicq">
                    <el-input v-model="form.qicq" style="width: 224px" clearable />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="7">
                <div class="grid-content ep-bg-purple">
                  <el-form-item label="电话号码" prop="tel">
                    <el-input v-model="form.tel" style="width: 400px" clearable />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="group4" style="margin-top: 12px">
            <el-row>
              <el-col :span="7">
                <div>
                  <el-form-item label="邮政编码" prop="zipcode">
                    <el-input v-model="form.zipcode" style="width: 50%" clearable />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </div>

          <!-- 底部按钮 -->
          <el-form-item style="margin-top: 2px">
            <el-button type="primary" @click="submitForm">保存修改</el-button>
            <!-- 重置还差逻辑，并且需要id表单里的data -->
            <el-button type="info" @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-form>
    </div>

   
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

// 更换头像
const imgUrl = ref('')

const form = ref({
  address: '',
  email: '',
  gender: '',
  identity: '',
  intro: '',
  mobile: '',
  name: '',
  qicq: '',
  tel: '',
  zipcode: ''
})

//校验规则
const rules = {
  address: [
    {
      required: false,
      pattern: '',
      message: '',
      trigger: 'blur'
    }
  ],
  email: [
    {
      trigger: 'blur'
    }
  ],
  gender: [
    {
      trigger: 'blur'
    }
  ],
  identity: [
    {
      trigger: 'blur'
    }
  ],
  intro: [
    {
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      trigger: 'blur'
    }
  ],
  name: [
    {
      trigger: 'blur'
    }
  ],
  qicq: [
    {
      trigger: 'blur'
    }
  ],
  zipcode: [
    {
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
// 表单重置逻辑(未完成)
const resetForm = ref({

})

//两次密码需要相同的校验
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
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
