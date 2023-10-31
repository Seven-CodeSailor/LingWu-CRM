<template>
  <!-- 顶部右侧静态 -->
  <!-- 刷新按钮 -->
  <el-tooltip
    class="box-item"
    effect="light"
    placement="bottom"
    content="刷新按钮"
  >
    <el-button small="small" icon="IconRefresh" circle @click="updateRefsh">
    </el-button>
  </el-tooltip>
  <!-- 全屏按钮 -->
  <el-tooltip
    class="box-item"
    effect="light"
    placement="bottom"
    content="全屏按钮"
  >
    <el-button
      small="small"
      icon="IconFullScreen"
      circle
      @click="fullScreen"
    ></el-button>
  </el-tooltip>
  <!-- 主题设置 -->
  <el-popover
    placement="bottom"
    title="主题设置"
    :width="300"
    trigger="hover"
    content=""
  >
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="暗黑模式">
        <el-switch
          @change="changeDark"
          v-model="dark"
          class="mt-2"
          style="margin-left: 24px"
          inline-prompt
          active-icon="IconMoonNight"
          inactive-icon="IconSunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button small="small" icon="IconSetting" circle></el-button>
    </template>
  </el-popover>
  <!-- 消息通知 -->

  <el-popover
    placement="bottom"
    title="消息提醒"
    :width="400"
    trigger="hover"
    content=""
  >
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="消息"> </el-form-item>
    </el-form>
    <template #reference>
      <el-button small="small" icon="IconBell" circle></el-button>
    </template>
  </el-popover>
  <el-dropdown style="margin-left: 20px">
    <span>
      {{ userInfo }}
      <el-icon is="ArrowDown"></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>修改密码</el-dropdown-item>
      </el-dropdown-menu>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/user'
import useLayOutSettingStore from '@/stores/setting.js'
import { useRouter } from 'vue-router'

const $router = useRouter()
const user = userStore()

const layOutSettingStore = useLayOutSettingStore()

// 用户信息提示
const userInfo = ref(
  '欢迎用户：' + (user.getUser === null ? '游客' : user.getUser.username)
)
// 刷新按钮回调
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}

// 退出登录点击回调
const logout = async () => {
  // 第一件事：向服务器发请求[退出登录接口]
  // 第二件事：仓库中关于用户相关的数据清空
  // 第三件事：跳转到登录页面
  await user.resetSaveData()
  $router.push({ path: '/' })
}
// 全屏按钮回调
const fullScreen = () => {
  // DOM对象的一个属性，可以用来判断当前是否是全屏模式
  let full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullscreen实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
//收集开关的数据
let dark = ref(false)
//switch开关的chang事件进行暗黑模式的切换
const changeDark = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>

<style lang="scss" scoped></style>
