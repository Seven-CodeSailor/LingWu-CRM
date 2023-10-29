<template>
  <!-- <div>我的客户</div> -->
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">我的客户</div>
      </h3>
      <el-button
        class="button"
        @click="operatingInstructionDialogVisible = true"
      >
        <el-icon style="margin-right: 4px"> <icon-question /></el-icon
        >操作说明</el-button
      >
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
          :getOpt="() => [0, 1]"
          excelName="入库明细.xlsx"
          tableName="入库明细的sheet表"
        >
        </BulkOPe>
      </div>
      <div class="right">
        <ChooseSelect
          style="margin-right: 10px"
          des="最近联系时间"
          :options="options"
        ></ChooseSelect>
        <ChooseSelect
          style="margin-right: 10px"
          :options="options"
          des="下次联系时间"
        ></ChooseSelect>
        <el-input
          v-model="name"
          placeholder="输入客户名称关键词"
          style="margin-right: 4px; width: 200px"
        />
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="searchDetails"
          :disabled="name ? false : true"
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
      :data="myclient.tableData"
      @selection-change="selectChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="客户名称" prop="name" sortable></el-table-column>
      <el-table-column label="归属于" prop="belong"></el-table-column>
      <el-table-column
        label="上次联系"
        prop="lastContact"
        sortable
      ></el-table-column>
      <el-table-column label="联系内容" prop="content"></el-table-column>
      <el-table-column
        label="下次联系"
        prop="nextContact"
        sortable
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-dropdown>
            <el-button type="primary">
              操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="addContact(row)"
                  >添加联系人</el-dropdown-item
                >
                <el-dropdown-item @click="addCommunicate(row)"
                  >添加沟通记录</el-dropdown-item
                >
                <el-dropdown-item divided @click="addService(row)"
                  >添加服务记录</el-dropdown-item
                >
                <el-dropdown-item @click="addOpportunity(row)"
                  >添加销售机会</el-dropdown-item
                >
                <el-dropdown-item divided @click="addContract(row)"
                  >添加合同</el-dropdown-item
                >
                <el-dropdown-item divided @click="detail(row)"
                  >详情</el-dropdown-item
                >
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
      :total="myclient.tableData.length"
      layout="prev, pager, next, jumper, ->, total, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 添加或修改客户信息 -->
  <el-drawer
    v-model="dialogVisible"
    :title="customerInfo.id === '' ? '添加客户信息' : '修改客户信息'"
    size="50%"
  >
    <el-form :model="customerInfo" label-width="120px" label-position="right">
      <el-form-item label="客户名称">
        <el-input
          v-model="customerInfo.name"
          placeholder="请输入客户名称"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户代表">
        <el-input
          v-model="customerInfo.name"
          placeholder="请输入客户代表"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户来源">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户来源"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户等级">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户等级"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户行业">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户行业"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="联系手机">
        <el-input v-model="customerInfo.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="customerInfo.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="customerInfo.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="客户介绍">
        <el-input
          v-model="customerInfo.desc"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户需求">
        <el-input v-model="customerInfo.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="公海客户">
        <el-checkbox-group v-model="customerInfo.seaCustomer">
          <el-checkbox
            name="type"
            @click="customerInfo.seaCustomer = !customerInfo.seaCustomer"
        /></el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加联系人 -->
  <el-drawer v-model="dialogVisible1" title="添加联系人" size="50%">
    <el-form :model="contactInfo" label-width="120px" label-position="right">
      <el-form-item label="姓名">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人姓名"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="contactInfo.sex">
          <el-radio label="男" />
          <el-radio label="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人手机"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人职位"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="电话">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人电话"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="QQ">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人QQ"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人邮箱"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="通信地址">
        <el-input
          v-model="contactInfo.name"
          placeholder="请输入联系人通信地址"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="options"
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
  <!-- 添加沟通记录 -->
  <el-drawer v-model="dialogVisible2" title="添加沟通记录" size="50%">
    <el-form
      :model="communicateInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="options"
          @update:cid="(value) => (communicateInfo.name = value)"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="options"
          :disabled="communicateInfo.name ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户销售机会">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户销售机会"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="当前阶段">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择当前阶段"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="沟通方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择沟通方式"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="沟通日期">
        <el-col :span="11">
          <el-date-picker
            v-model="contactInfo.data"
            type="date"
            placeholder="请选择沟通日期"
          />
        </el-col>
        <el-time-picker
          v-model="contactInfo.time"
          placeholder="请选择沟通时间"
        />
      </el-form-item>
      <el-form-item label="联系内容">
        <el-input
          v-model="contactInfo.name"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="下次沟通日期">
        <el-col :span="11">
          <el-date-picker
            v-model="contactInfo.nextData"
            type="date"
            placeholder="请选择下次沟通日期"
          />
        </el-col>
        <el-time-picker
          v-model="contactInfo.nextTime"
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
  <!-- 添加服务记录 -->
  <el-drawer v-model="dialogVisible3" title="添加服务记录" size="50%">
    <el-form :model="serviceInfo" label-width="120px" label-position="right">
      <el-form-item label="服务类型">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务类型"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务方式">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择服务方式"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="服务时间">
        <el-col :span="11">
          <el-date-picker
            v-model="serviceInfo.data"
            type="date"
            placeholder="服务日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="花费时间(分钟)">
        <el-input-number v-model="serviceInfo.time" min="0" />
      </el-form-item>
      <el-form-item label="服务内容">
        <el-input
          v-model="serviceInfo.name"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取消</el-button>
        <el-button type="primary" @click="saveService"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加销售机会 -->
  <el-drawer v-model="dialogVisible4" title="添加服务记录" size="50%">
    <el-form
      :model="opportunityInfo"
      label-width="120px"
      label-position="right"
    >
      <el-form-item label="服务内容">
        <el-input v-model="opportunityInfo.theme" style="width: 650px" />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          @update:cid="(value) => (opportunityInfo.name = value)"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="options"
          :disabled="opportunityInfo.name ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="当前阶段">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择当前阶段"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="发现日期">
        <el-col :span="11">
          <el-date-picker
            v-model="opportunityInfo.data"
            type="date"
            placeholder="选择发现日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="预签订日期">
        <el-col :span="11">
          <el-date-picker
            v-model="opportunityInfo.preData"
            type="date"
            placeholder="选择预签订日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="金额(元)">
        <el-input v-model="opportunityInfo.price" placeholder="预定签单金额" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="opportunityInfo.desc"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible4 = false">取消</el-button>
        <el-button type="primary" @click="saveOpportunity"> 添加 </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- 添加合同 -->
  <el-drawer v-model="dialogVisible5" title="添加合同" size="50%">
    <el-form :model="contractInfo" label-width="120px" label-position="right">
      <el-form-item label="合同编号">
        <el-input v-model="contractInfo.id" style="width: 650px" disabled />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="contractInfo.title" style="width: 650px" />
      </el-form-item>
      <el-form-item label="客户名称">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户名称"
          @update:cid="(value) => (contractInfo.name = value)"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户联系人">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户联系人"
          :options="options"
          :disabled="contractInfo.name ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="客户销售机会">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择客户销售机会"
          :options="options"
          :disabled="contractInfo.name ? false : true"
        ></ChooseSelect>
      </el-form-item>
      <el-form-item label="起始日期">
        <el-col :span="11">
          <el-date-picker
            v-model="contractInfo.data"
            type="date"
            placeholder="选择起始日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-col :span="11">
          <el-date-picker
            v-model="contractInfo.endData"
            type="date"
            placeholder="选择结束日期"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="合同金额(元)">
        <el-input v-model="contractInfo.price" placeholder="预定签单金额" />
      </el-form-item>
      <el-form-item label="介绍">
        <el-input
          v-model="contractInfo.desc"
          type="textarea"
          style="width: 650px"
        />
      </el-form-item>
      <el-form-item label="我方代表">
        <ChooseSelect
          style="margin-right: 10px; width: 250px"
          des="请选择我方代表"
          :options="options"
        ></ChooseSelect>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible5 = false">取消</el-button>
        <el-button type="primary" @click="saveContract"> 添加 </el-button>
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
import { ref } from 'vue'
import useMyClient from '@/stores/customer/myclient.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ArrowDown } from '@element-plus/icons-vue'

// 我的客户store仓库
const myclient = useMyClient()
// 当前页数
let currentPage = ref(1)
// 每页数据
let pageSize = ref(5)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

// 最近联系时间的选项
const options = ref([
  {
    value: 'Option1',
    label: '最近三天'
  },
  {
    value: 'Option2',
    label: '最近一周'
  },
  {
    value: 'Option3',
    label: '最近半月'
  },
  {
    value: 'Option4',
    label: '最近一月'
  },
  {
    value: 'Option5',
    label: '最近三月'
  },
  {
    value: 'Option6',
    label: '最近六月'
  },
  {
    value: 'Option7',
    label: '最近一年'
  }
])

// 用于搜索的客户名称关键词
const name = ref('')

/**
 * 添加
 */
// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
// 存放添加或修改的客户信息
let customerInfo = ref({
  id: '',
  name: '',
  desc: '',
  seaCustomer: false
})
// 点击添加按钮的回调
const addMyClinet = () => {
  dialogVisible.value = true
}
// 添加或修改客户按钮确定回调
const save = () => {
  customerInfo.value.id = ''
  customerInfo.value.name = ''
  customerInfo.value.desc = ''
  customerInfo.value.seaCustomer = false
  dialogVisible.value = false
  ElMessage.success('添加成功')
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
  ElMessage.success('批量删除成功')
  // 删除后重新请求数据
}

/**
 * 添加联系人
 */
// 控制添加联系人抽屉的显示和隐藏
let dialogVisible1 = ref(false)
// 存储联系人的数据
let contactInfo = ref({
  id: '',
  name: '',
  sex: ''
})
// 添加联系人按钮回调，打开抽屉
const addContact = (row) => {
  dialogVisible1.value = true
  contactInfo.value.id = row.id
  console.log('添加联系人', row)
}
// 添加联系人保存数据按钮回调
const saveContact = () => {
  dialogVisible1.value = false
  ElMessage.success('添加成功')
}

/**
 * 添加沟通记录
 */
// 控制添加沟通记录抽屉的显示和隐藏
let dialogVisible2 = ref(false)
// 存储添加沟通记录的数据
let communicateInfo = ref({
  id: '',
  name: '',
  data: '',
  time: '',
  nextData: '',
  nextTime: ''
})
// 添加沟通记录按钮回调
const addCommunicate = (row) => {
  dialogVisible2.value = true
  communicateInfo.value.id = row.id
}
// 保存数据，发送请求
const saveCommunicate = () => {
  dialogVisible2.value = false
  ElMessage.success('添加成功')
}

/**
 * 添加服务记录
 */
// 控制添加服务记录抽屉的显示和隐藏
let dialogVisible3 = ref(false)
let serviceInfo = ref({
  id: '',
  type: '',
  name: '',
  data: '',
  time: ''
})
// 添加服务记录按钮回调
const addService = (row) => {
  dialogVisible3.value = true
  serviceInfo.value.id = row.id
}
// 保存数据，发送请求
const saveService = () => {
  dialogVisible3.value = false
  ElMessage.success('添加成功')
}

/**
 * 添加销售机会
 */
// 控制添加销售机会抽屉的显示和隐藏
let dialogVisible4 = ref(false)
let opportunityInfo = ref({
  id: '',
  theme: '',
  name: '',
  data: '',
  preData: '',
  desc: '',
  price: ''
})
// 添加销售机会按钮回调
const addOpportunity = (row) => {
  dialogVisible4.value = true
  opportunityInfo.value.id = row.id
}
// 根据已保存的数据，发送请求
const saveOpportunity = () => {
  dialogVisible4.value = false
  ElMessage.success('添加成功')
}

/**
 * 添加合同
 */
// 控制添加销售机会抽屉的显示和隐藏
let dialogVisible5 = ref(false)
let contractInfo = {
  id: '',
  title: '',
  name: '',
  data: '',
  endData: '',
  price: '',
  desc: ''
}
// 添加合同按钮回调
const addContract = (row) => {
  dialogVisible5.value = true
  contractInfo.value.id = row.id
}
// 根据已保存的数据，发送请求
const saveContract = () => {
  dialogVisible5.value = false
  ElMessage.success('添加成功')
}

/**
 * 详情
 */
// 详情按钮回调
const detail = (row) => {
  alert('详情', row)
}

/**
 * 修改
 */
// 修改按钮回调
const modify = (row) => {
  customerInfo.value.id = row.id
  dialogVisible.value = true
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
const Confirms = () => {
  confirmDelete.value = false
  ElMessage.success('删除成功')
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
