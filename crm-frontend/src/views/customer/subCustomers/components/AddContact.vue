<template>
  <el-drawer v-model="dialogVisible1" title="添加联系人" size="50%">
    <el-form
      :model="myclient.contactInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="myclient.contactInfo.name"
          placeholder="请输入联系人姓名"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="myclient.contactInfo.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机">
        <el-input
          v-model="myclient.contactInfo.mobile"
          placeholder="请输入联系人手机"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          v-model="myclient.contactInfo.position"
          placeholder="请输入联系人职位"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="电话">
        <el-input
          v-model="myclient.contactInfo.tel"
          placeholder="请输入联系人电话"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="QQ">
        <el-input
          v-model="myclient.contactInfo.qq"
          placeholder="请输入联系人QQ"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="myclient.contactInfo.email"
          placeholder="请输入联系人邮箱"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="通信地址">
        <el-input
          v-model="myclient.contactInfo.address"
          placeholder="请输入联系人通信地址"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="contactGetName()"
          ref="customerName"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="saveContact"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import useMyClient from '@/stores/customer/subclient.js'
import useSelect from '@/stores/customer/select.js'
import { addNewContact } from '@/apis/customer/index.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'

// 我的客户store仓库
const myclient = useMyClient()
// 下拉列表仓库
const select = useSelect()

/**
 * 添加联系人
 */
// 控制添加联系人抽屉的显示和隐藏
let dialogVisible1 = ref(false)
// 添加联系人按钮回调，打开抽屉
const addContact = async (row) => {
  await getCustomerName()
  // 根据传入id获取数据
  dialogVisible1.value = true
  myclient.contactInfo.id = row.id
}
const customerName = ref()
// 添加联系人保存数据按钮回调
const saveContact = async () => {
  await addNewContact(
    myclient.contactInfo,
    () => {
      ElMessage.success('添加成功')
    },
    () => {
      ElMessage.error('添加失败')
    }
  )
  dialogVisible1.value = false
  myclient.contactReset()
  select.resetData()
  //   initCustomer()
}
// 获取客户名称下拉列表
const contactGetName = async () => {
  await getCustomerName()
  myclient.contactInfo.customerName = customerName.value.selectValue.label
}
defineExpose({
  addContact
})
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
