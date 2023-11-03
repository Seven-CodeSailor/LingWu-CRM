<template>
  <el-drawer v-model="dialogVisible1" title="添加联系人" size="50%">
    <el-form
      :model="supplierList.contactInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="supplierList.contactInfo.name"
          placeholder="请输入联系人姓名"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="supplierList.contactInfo.gender">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机">
        <el-input
          v-model="supplierList.contactInfo.mobile"
          placeholder="请输入联系人手机"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          v-model="supplierList.contactInfo.position"
          placeholder="请输入联系人职位"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="电话">
        <el-input
          v-model="supplierList.contactInfo.tel"
          placeholder="请输入联系人电话"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="QQ">
        <el-input
          v-model="supplierList.contactInfo.qq"
          placeholder="请输入联系人QQ"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="supplierList.contactInfo.email"
          placeholder="请输入联系人邮箱"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="通信地址">
        <el-input
          v-model="supplierList.contactInfo.address"
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
import useSelect from '@/stores/customer/select.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { addlinkman } from '@/apis/supplier/supplierContact.js'

import useSupplierList from '@/stores/supplier/list/list.js'

const supplierList = useSupplierList()

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
  supplierList.contactInfo.id = row.supplierId
  console.log(row)
}
const customerName = ref()
// 添加联系人保存数据按钮回调
const saveContact = async () => {
  await addlinkman(
    supplierList.contactInfo,
    () => {
      ElMessage.success('添加成功')
    },
    () => {
      ElMessage.error('添加失败')
    }
  )
  dialogVisible1.value = false
  supplierList.contactReset()
  select.resetData()
  //   initCustomer()
}
// 获取客户名称下拉列表
const contactGetName = async () => {
  await getCustomerName()
  supplierList.contactInfo.customerName = customerName.value.selectValue.label
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
