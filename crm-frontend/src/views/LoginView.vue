<!-- 登录页面 -->
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bgImg"></el-col>
    <el-col :span="8" :offset="2" class="from">
      <el-card class="box-card">
        <div class="title">
          <h1>登录</h1>
        </div>
        <el-form :model="formData" status-icon label-width="60px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">登录</el-button>
            <el-button @click="useVerify">测试</el-button>
          </el-form-item>
        </el-form>
        <!-- TODO[TEST_CODE]: 测试代码后期发布需要删除 -->
        <router-link to="/sample">进入示例演示页面</router-link>
      </el-card>
    </el-col>
  </el-row>

  <!-- 验证码组件 -->
  <Verify
    mode="pop"
    :captchaType="captchaType"
    :imgSize="{ width: '400px', height: '200px' }"
    ref="verify"
    @success="handleSuccess"
  ></Verify>
</template>

<script setup>
import Verify from '@/components/verifition/Verify.vue'
// import Request from '@/apis/request'
import { ref, reactive } from 'vue'
import { login } from '@/apis/login'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

// 获取router对象
const $router = useRouter()

// 定义登录数据对象
const formData = reactive({
  username: '',
  password: ''
})

/**
 * 执行登录
 * @param code 验证码字符串
 */
function doLogin(code) {
  // 发送登录请求
  login(
    {
      ...formData,
      clientId: import.meta.env.VITE_CLIENT_ID,
      code: code
    },
    () => {
      // 跳转到首页
      $router.push('/home')
      // 登录成功提示
      ElMessage.success('登录成功，前往首页')
    },
    () => {
      ElMessage.error('账号或密码错误')
    }
  )
}

// 定义登录提交函数
function submitForm() {
  //TODO[TEST_CODE]:测试直接进入主界面
  //$router.push('/home')

  // 弹出验证码框
  //useVerify('clickWord')

  doLogin('ccc')
}

// 验证码组件引用
const verify = ref(null)

// 验证码类型
const captchaType = ref('')

/**
 * 弹出验证码框
 * @param type 验证码类型 blockPuzzle滑块验证 clickWord点击文字验证
 */
function useVerify(type) {
  captchaType.value = type
  verify.value.show()
}

/**
 * 验证码验证通过执行登录二次验证逻辑
 * @param res 验证通过信息
 */
function handleSuccess(res) {
  //TODO[TEST_CODE]:测试调用二次验证
  // Request.requestForm(
  //   Request.POST,
  //   '/login',
  //   { captchaVerification: res.captchaVerification },
  //   { baseURL: import.meta.env.VITE_CAPTCHA_URL }
  // )
  //   .then((res) => {
  //     console.log(res)
  //     if (res.data.repCode === '0000') {
  //       // 跳转到首页
  //       $router.push('/home')
  //       // 登录成功提示
  //       ElMessage.success('登录成功，前往首页')
  //       return
  //     }
  //     ElMessage.error('账号或密码错误')
  //   })
  //   .catch((res) => {
  //     console.log(res)
  //     ElMessage.error('账号或密码错误')
  //   })

  doLogin(res.captchaVerification)
}
</script>

<style>
.login-page {
  height: 100vh;
  background-color: #fff;
  /* background: url('../../public/loginImg.webp') no-repeat center/cover; */
  /* filter: blur(2px); */
}
/* 背景的样式 */
.bgImg {
  background-color: #a29bfe;
  border-radius: 0 40px 40px 0;
  /* background: url('../../../documents/00、preview-pic/architecture.jpg')
    no-repeat 60% center / 240px auto; */
  background: url('../../public/loginImg.jpg') no-repeat center/cover;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  /* background-color: #ccc; */
}

.from {
  /* background-color: #999; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-card {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 65% 35% 46% 54% / 40% 55% 45% 60%; */
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  /* background-color: rgba(0, 0, 0, 0.5); */
  /* color: #fff; */
}
</style>
