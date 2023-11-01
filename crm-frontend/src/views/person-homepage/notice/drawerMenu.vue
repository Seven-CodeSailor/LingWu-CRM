
<!-- 查看的公告内容 -->
<template>
  <el-drawer v-model="checkNotice" title="查看公告" direction="rtl">
    <el-form
      :model="checkForm"
      :rules="rules"
      label-width="120px"
      class="demo-checkForm"
    >
      <el-form-item label="通知公告" prop="toTitle">
        <el-input v-model="ruleForm.name" placeholder="输入标题" />
      </el-form-item>
      <el-form-item label="通知对象" prop="toDepartment">
        <ChooseSelect
          :options="options"
          des="请选通知部门"
          style="width: 60%"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="指定对象" prop="toPerson">
        <ChooseSelect
          :options="options"
          des="请选指定对象"
          style="width: 60%"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="通知内容">
        <el-input v-model="textarea" :rows="2" type="textarea" />
      </el-form-item>
      <el-form-item margin-top="20px">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
// 查看公告
 const detail = ref({
  id: '',
  title: '',
  content: ''
})
const dialogVisible1 = ref(false)
const look = (row) => {
  ;(detail.value.id = row.id),
    (detail.value.title = row.title),
    (detail.value.content = row.content),
    (dialogVisible1.value = true)
}
</script>

<style scoped></style>
