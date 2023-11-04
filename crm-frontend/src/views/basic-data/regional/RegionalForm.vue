<template>
  <div class="RegionalForm">
    <el-drawer v-model="visible" @close="handleClear">
      <template #header>
        <h4>{{ props.title }}</h4>
      </template>
      <template #default>
        <el-form :model="form" :rules="rules" ref="formRef">
          <el-form-item label="名称" prop="typeName">
            <el-input placeholder="请输入名称" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="父级栏目">
            <el-tree-select
              v-model="selectValue"
              :data="props.areaTreeData"
              :render-after-expand="false"
            />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number
              v-model="form.sort"
              :min="0"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="启用">
            <el-switch v-model="form.visible" />
          </el-form-item>
          <el-form-item label="介绍">
            <el-input
              placeholder="请输入介绍"
              v-model="form.intro"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="props.handleSubmit">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
const form = ref({
  name: '',
  sort: 0,
  visible: false,
  intro: '',
  selectValue: ''
})
const selectValue = ref('')
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
  },
  areaTreeData: {
    type: Array
  }
})
const formRef = ref(null)

const rules = ref({
  // typeName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  // sort: [{ required: true, message: '', trigger: 'blur' }]
})

const handleClear = () => {
  if (props.title === '修改') {
    form.value = {
      name: '',
      sort: 0,
      visible: false,
      intro: '',
      selectValue: ''
    }
  }
  visible.value = false
  formRef.value.clearValidate()
}

defineExpose({
  visible,
  form,
  formRef
})
</script>

<style lang="scss" scoped></style>
