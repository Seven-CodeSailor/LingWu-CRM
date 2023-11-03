<template>
  <el-drawer
    v-model="dialogVisible"
    :title="
      supplierList.addOrUpdateSupplier.supplierId === ''
        ? '添加供应商'
        : '修改供应商'
    "
    size="50%"
  >
    <el-form
      :model="supplierList.addOrUpdateSupplier"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="供应商名称">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.supplierName"
          placeholder="请输入供应商名称"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="经济类型">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择经济类型"
          :options="select.name"
          @update:cid="getEcoType()"
          ref="ecoType"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="行业类型">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择行业类型"
          :options="select.name"
          @update:cid="getIndType()"
          ref="indType"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.contact"
          placeholder="请输入联系人"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="电话">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.telephone"
          placeholder="请输入电话"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="传真">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.fax"
          placeholder="请输入传真"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.email"
          placeholder="请输入邮箱"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="地址">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.address"
          placeholder="请输入地址"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="supplierList.addOrUpdateSupplier.intro"
          type="textarea"
          style="width: 500px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import useSelect from '@/stores/customer/select.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'

import useSupplierList from '@/stores/supplier/list/list.js'
import { addSupplier, modifySupplier } from '@/apis/supplier/supplierList.js'

const supplierList = useSupplierList()

// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
// 下拉列表仓库
const select = useSelect()

const ecoType = ref()
const indType = ref()
const getEcoType = async () => {
  await getCustomerName()
  supplierList.addOrUpdateSupplier.ecoType = ecoType.value.selectValue.label
}
const getIndType = async () => {
  await getCustomerName()
  supplierList.addOrUpdateSupplier.indType = indType.value.selectValue.label
}
// 点击添加按钮的回调
const addMyClinet = () => {
  getEcoType()
  dialogVisible.value = true
}
// 添加按钮确定回调
const save = async () => {
  if (supplierList.addOrUpdateSupplier.supplierId === '') {
    await modifySupplier(
      supplierList.addOrUpdateSupplier,
      () => {
        ElMessage.success('添加成功')
      },
      () => {
        ElMessage.error('添加失败')
      }
    )
  } else {
    await addSupplier(
      supplierList.addOrUpdateSupplier,
      () => {
        ElMessage.success('修改成功')
      },
      () => {
        ElMessage.error('修改失败')
      }
    )
  }
  supplierList.addOrUpdateSupplierReset()
  ecoType.value.reset()
  indType.value.reset()
  select.resetData()
  dialogVisible.value = false
}
// 修改按钮回调
const modify = async (row) => {
  await getCustomerName(row.supplierId)
  supplierList.addOrUpdateSupplierReset.supplierId = row.supplierId
  dialogVisible.value = true
}

defineExpose({
  addMyClinet,
  modify
})
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
