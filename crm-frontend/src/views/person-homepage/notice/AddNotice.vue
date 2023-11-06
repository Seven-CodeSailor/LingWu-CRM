<template>
  <div class="WarehouseFrom">
    <el-drawer v-model="addDrawer" title="添加通知" direction="rtl">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item
          label="通知标题"
          prop="Title"
          :rules="rules"
          ref="formRef"
        >
          <el-input v-model="form.Title" placeholder="输入标题" />
        </el-form-item>
        <el-form-item label="通知对象" prop="Department">
          <ChooseSelect
            v-model="form.Department"
            :options="options"
            des="请选通知部门"
            style="width: 60%"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="指定对象" prop="Person">
          <ChooseSelect
            v-model="form.Person"
            :options="options"
            des="请选指定对象"
            style="width: 60%"
          ></ChooseSelect>
        </el-form-item>
        <el-form-item label="通知内容" prop="Intro">
          <el-input v-model="form.Intro" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item margin-top="20px">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="props.handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)

// 添加抽屜表单
const addDrawer = ref(false)
// 添加公告逻辑
const addEvent = () => {
  addDrawer.value = true
}
const form = ref({
  Title: '',
  Department: '',
  Person: '',
  Intro: ''
//   ownerUserId:'',
})

const props = defineProps({
  handleSubmit: {
    type: Function,
    default: () => {
      console.log('sumbit')
    }
  },
  title: {
    type: String,
    default: '标题的默认值'
  }
})

const formRef = ref(null)

const rules = ref({
  Title: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  ownerDeptId: [{ trigger: 'change' }]
//   ownerUserId: [{ required: true, message: '', trigger: 'change' }]
})

defineExpose({
  visible,
  form,
  formRef
})

</script>

<style lang="scss" scoped></style>
