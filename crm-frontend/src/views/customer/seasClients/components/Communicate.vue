<template>
  <el-drawer v-model="dialogVisible2" title="添加沟通记录" size="50%">
    <el-form
      :model="myclient.communicateInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="communicateGetName()"
          ref="customerName0"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="select.contacts"
          @update:cid="communicateGetContacts()"
          ref="customerContact"
          :disabled="myclient.communicateInfo.customerName ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户销售机会">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户销售机会"
          :options="select.opportnity"
          @update:cid="communicateGetOpportunity()"
          ref="customerOpportunity"
          :disabled="myclient.communicateInfo.customerName ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="当前阶段">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择当前阶段"
          :options="select.stage"
          @update:cid="communicateGetStage()"
          ref="customerStage"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="沟通方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择沟通方式"
          :options="select.stage"
          @update:cid="communicateGetWay()"
          ref="communicateWay"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="沟通日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.communicateInfo.data"
            type="date"
            placeholder="请选择沟通日期"
          />
        </el-col>
        <el-time-picker
          v-model="myclient.communicateInfo.time"
          placeholder="请选择沟通时间"
        />
      </el-form-item>
      <el-form-item label="联系内容">
        <el-input
          v-model="myclient.communicateInfo.content"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="下次沟通日期">
        <el-col :span="11">
          <el-date-picker
            v-model="myclient.communicateInfo.nextData"
            type="date"
            placeholder="请选择下次沟通日期"
          />
        </el-col>
        <el-time-picker
          v-model="myclient.communicateInfo.nextTime"
          placeholder="请选择下次沟通时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="saveCommunicate"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import useSeasClient from '@/stores/customer/seasclient.js'
import useSelect from '@/stores/customer/select.js'
import {
  getCustomerConcats,
  getCustomerOpportnity,
  getCustomerStage,
  getCustomerWay
} from '@/apis/customer/index.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'

// 我的客户store仓库
const myclient = useSeasClient()
// 下拉列表仓库
const select = useSelect()

/**
 * 添加沟通记录
 */
// 控制添加沟通记录抽屉的显示和隐藏
let dialogVisible2 = ref(false)
const customerName0 = ref()
const customerContact = ref()
const customerOpportunity = ref()
const customerStage = ref()
const communicateWay = ref()
// 获取客户名称下拉列表
const communicateGetName = async () => {
  await getCustomerName()
  myclient.communicateInfo.customerName = customerName0.value.selectValue.label
}
// 获取客户联系人下拉列表
const communicateGetContacts = async () => {
  await getCustomerConcats()
  myclient.communicateInfo.contact = customerContact.value.selectValue.label
}
// 获取客户销售机会下拉列表
const communicateGetOpportunity = async () => {
  await getCustomerOpportnity()
  myclient.communicateInfo.opportnity =
    customerOpportunity.value.selectValue.label
}
// 获取当前阶段下拉列表
const communicateGetStage = async () => {
  await getCustomerStage()
  myclient.communicateInfo.stage = customerStage.value.selectValue.label
}
// 获取沟通方式下拉列表
const communicateGetWay = async () => {
  await getCustomerWay()
  myclient.communicateInfo.way = communicateWay.value.selectValue.label
}
// 添加沟通记录按钮回调
const addCommunicate = async (row) => {
  await getCustomerName()
  await getCustomerConcats()
  await getCustomerOpportnity()
  await getCustomerStage()
  await getCustomerWay()
  dialogVisible2.value = true
  myclient.communicateInfo.id = row.id
}
// 保存数据，发送请求
const saveCommunicate = () => {
  dialogVisible2.value = false
  myclient.communicateReset()
  select.resetData()
  ElMessage.success('添加成功')
}
defineExpose({
  addCommunicate
})
</script>

<style lang="scss" scoped></style>
