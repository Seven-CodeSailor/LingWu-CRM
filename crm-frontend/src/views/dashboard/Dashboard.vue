<template>
  <el-card>
    <div class="box">
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好{{ user.user }}</h3>
        <p class="subtitle">01星球CRM</p>
      </div>
    </div>
    <div class="bottoms">
      <el-descriptions
        :title="dashBoard.announcement[0].title"
        v-if="dashBoard.announcement[0].content !== ''"
      >
        <el-descriptions-item label="">{{
          dashBoard.announcement[0].content
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions
        title="系统公告"
        v-if="dashBoard.announcement[0].content === ''"
      >
        <el-descriptions-item label="">暂无公告</el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>
<script setup>
// 引入用户相关的仓库，获取当前用户的头像、昵称
import { userStore } from '@/stores/user.js'
import useDashBoard from '@/stores/dashboard/dashBoard.js'
const user = userStore()
const dashBoard = useDashBoard()

// 封装一个函数：获取一个结果：早上|上午|中午|下午|晚上
const getTime = () => {
  let message = ''
  // 通过内置构造函数Date
  const hours = new Date().getHours()
  if (hours < 9 && hours >= 6) {
    message = '早上'
  } else if (hours < 12) {
    message = '上午'
  } else if (hours < 14) {
    message = '中午'
  } else if (hours < 18) {
    message = '下午'
  } else if (hours < 24) {
    message = '晚上'
  } else {
    message = '凌晨'
  }
  return message
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 2px solid #aeaeae;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 700;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .subtitle {
      font-style: italic;
      color: skyblue;
      display: block;
    }
  }
}
.bottoms {
  padding-left: 20px;
}
</style>
