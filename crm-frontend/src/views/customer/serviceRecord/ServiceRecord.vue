<template>
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">服务记录</div>
      </h3>
    </header>
    <!-- 操作搜索栏 -->
    <section class="menu">
      <div class="left">
        <el-button type="primary" icon="IconPlus" @click="addMyClinet"
          >添加</el-button
        >
        <el-popconfirm
          :title="`你确定要删除这些选择的客户吗?`"
          width="260px"
          @confirm="deleteByQuery"
        >
          <template #reference>
            <el-button
              type="danger"
              icon="IconDelete"
              style="margin-right: 10px"
              :disabled="selectIdArr.length ? false : true"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
        <BulkOPe
          :getOpt="() => [3, 4]"
          :msgSend="msgSend"
          :emailSend="emailSend"
        >
        </BulkOPe>
      </div>
      <div class="right" style="display: flex">
        <el-input
          v-model="content"
          placeholder="输入客户名称"
          style="margin-right: 4px; width: 200px"
        />
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails"
          :disabled="content ? false : true"
          icon="IconSearch"
        >
          搜索</el-button
        >
      </div>
    </section>
    <!-- 表格部分 -->
    <el-table
      style="width: 100%; margin-bottom: 20px"
      table-layout="auto"
      :data="serviceRecord.tableData"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        label="客户名称"
        prop="customer_name"
        sortable
      ></el-table-column>
      <el-table-column label="服务类型" prop="services"></el-table-column>
      <el-table-column label="服务方式" prop="servicesmodel"></el-table-column>
      <el-table-column label="服务日期" prop="serviceTime"></el-table-column>
      <el-table-column label="花费时间" prop="tlen" sortable></el-table-column>
      <el-table-column label="服务内容" prop="content"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="modify(row)">修改</el-dropdown-item>
                <el-dropdown-item @click="Deletes(row)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20, 50]"
      :total="serviceRecord.total"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 添加或修改客户信息 -->
  <el-drawer
    v-model="dialogVisible"
    :title="
      serviceRecord.temp.service_id === '' ? '添加服务记录' : '修改服务记录'
    "
    size="50%"
  >
    <el-form
      :model="serviceRecord.temp"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="服务类型">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务类型"
          :options="select.type"
          @update:cid="serviceGettype()"
          ref="serviceType"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务方式"
          :options="select.way"
          @update:cid="serviceGetWay()"
          ref="serviceWay"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务日期">
        <el-col :span="11">
          <el-date-picker
            v-model="serviceRecord.temp.service_time"
            type="date"
            placeholder="请选择服务日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="花费时间(分钟)">
        <el-input-number v-model="serviceRecord.temp.tlen" min="0" />
      </el-form-item>
      <el-form-item label="服务内容">
        <el-input
          v-model="serviceRecord.temp.content"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="select.name"
          @update:cid="contractGetName()"
          ref="customerName"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 删除确认 -->
  <el-dialog
    v-model="confirmDelete"
    title="删除"
    width="30%"
    :before-close="(deleteId = null)"
  >
    <span style="color: red; margin-left: 33%; font-size: 24px"
      >是否确认删除</span
    >
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="confirmDelete = false">取消</el-button>
        <el-button type="danger" @click="Confirms"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useServiceRecord from '@/stores/customer/servicerecord.js'
import useSelect from '@/stores/customer/select.js'
import { getCustomerName } from '@/apis/publicInterface.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ArrowDown } from '@element-plus/icons-vue'
import {
  queryServiceNote,
  getCustomerServiceType,
  getCustomerServiceWay,
  addService,
  modifyService,
  removeService,
  sendsmsService,
  sendEmailService
} from '@/apis/customer/index.js'
import { ElMessage } from 'element-plus'

// 初始化数据
const initLinks = (currentPage, pageSize, customerName) => {
  queryServiceNote(
    currentPage,
    pageSize,
    customerName,
    (response) => {
      serviceRecord.setTableData(response.data.rows)
      serviceRecord.total = response.data.total
    },
    () => {
      ElMessage.error('获取数据失败')
    }
  )
}
onMounted(() => {
  initLinks(currentPage.value, pageSize.value)
})
// 我的客户store仓库
const serviceRecord = useServiceRecord()
// 下拉列表仓库
const select = useSelect()
// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
// 当前页数
const currentPage = ref(1)
// 每页数据
const pageSize = ref(5)
const handleSizeChange = (val) => {
  pageSize.value = val
  initLinks(currentPage.value, pageSize.value)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  initLinks(currentPage.value, pageSize.value)
}
// 发送消息按钮回调
const msgSend = async (title, desc) => {
  await sendsmsService(
    selectIdArr.value,
    title,
    desc,
    () => {
      ElMessage.success('短信发送成功')
    },
    () => {
      ElMessage.error('短信发送失败')
    }
  )
}
// 发送邮件按钮回调
const emailSend = async (title, desc) => {
  await sendEmailService(
    selectIdArr.value,
    title,
    desc,
    () => {
      ElMessage.success('邮件发送成功')
    },
    () => {
      ElMessage.error('邮件发送失败')
    }
  )
}

const customerName = ref()
const serviceWay = ref()
const serviceType = ref()
// 获取客户名称下拉列表
const contractGetName = () => {
  getCustomerName('', (response) => {
    let data = []
    response.data.forEach((item) => {
      data.push({ value: item.customer_id, label: item.name })
    })
    select.setName(data)
  })
  serviceRecord.temp.customer_id = customerName.value.selectValue.value
}
// 获取服务类型下拉列表
const serviceGettype = async () => {
  await getCustomerServiceType()
  serviceRecord.temp.services = serviceType.value.selectValue.label
}
// 获取服务方式下拉列表
const serviceGetWay = async () => {
  await getCustomerServiceWay()
  serviceRecord.temp.servicesmodel = serviceWay.value.selectValue.label
}
// 点击添加按钮的回调
const addMyClinet = async () => {
  getCustomerName('', (response) => {
    let data = []
    response.data.forEach((item) => {
      data.push({ value: item.customer_id, label: item.name })
    })
    select.setName(data)
  })
  await getCustomerServiceType()
  await getCustomerServiceWay()
  serviceRecord.tempReset()
  dialogVisible.value = true
}
// 添加按钮确定回调
const save = async () => {
  if (serviceRecord.temp.service_id === '') {
    await addService(
      serviceRecord.temp,
      () => {
        ElMessage.success('添加成功')
      },
      () => {
        ElMessage.error('添加失败')
      }
    )
  } else {
    await modifyService(
      serviceRecord.temp,
      () => {
        ElMessage.success('修改成功')
      },
      () => {
        ElMessage.error('修改失败')
      }
    )
  }
  serviceRecord.tempReset()
  select.resetData()
  dialogVisible.value = false
  initLinks(currentPage.value, pageSize.value)
}
// 修改按钮回调
const modify = async (row) => {
  await getCustomerName()
  await getCustomerServiceType()
  await getCustomerServiceWay()
  serviceRecord.temp.service_id = row.service_id
  dialogVisible.value = true
}

/**
 * 批量删除
 */
// 存储批量删除的客户的id
let selectIdArr = ref([])
// table复选框勾选时触发的事件
const selectChange = (value) => {
  selectIdArr.value = value
}
// 批量删除按钮
const deleteByQuery = () => {
  let data = []
  selectIdArr.value.forEach((item) => {
    data.push(item.service_id)
  })
  removeService(
    data,
    () => {
      ElMessage.success('删除成功')
    },
    () => {
      ElMessage.error('删除失败')
    }
  )
  // 删除后重新请求数据
  initLinks(currentPage.value, pageSize.value)
}

/**
 * 搜索
 */
let content = ref('')
const searchDetails = () => {
  initLinks(currentPage.value, pageSize.value, content.value)
  content.value = ''
}

/**
 * 删除
 */
let confirmDelete = ref(false)
let deleteId = ref()
// 删除按钮回调
const Deletes = (row) => {
  deleteId.value = row.id
  confirmDelete.value = true
}
const Confirms = async () => {
  confirmDelete.value = false
  await removeService(
    [deleteId.value],
    () => {
      ElMessage.success('删除成功')
    },
    () => {
      ElMessage.error('删除失败')
    }
  )
  // 删除后重新请求数据
  initLinks(currentPage.value, pageSize.value)
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: space-around;
}
</style>
