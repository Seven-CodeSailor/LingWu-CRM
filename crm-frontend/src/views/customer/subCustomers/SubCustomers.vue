<template>
  <!-- <div>我的客户</div> -->
  <el-card>
    <!-- 头部 -->
    <header>
      <h3>
        <slot name="ico"></slot>
        <div style="margin-left: 8px">下属客户</div>
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
        <el-button
          type="primary"
          icon="IconPlus"
          style="margin-right: 10px"
          @click="addMyClinet"
          >添加</el-button
        >
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
    :title="form.id === '' ? '添加客户信息' : '修改客户信息'"
    size="50%"
  >
    <el-form :model="form" label-width="120px" label-position="right">
      <el-form-item label="客户名称">
        <el-input
          v-model="form.name"
          placeholder="请输入客户名称"
          style="width: 500px"
        />
      </el-form-item>
      <el-form-item label="客户代表">
        <el-input
          v-model="form.name"
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
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="联系地址">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="客户介绍">
        <el-input v-model="form.desc" type="textarea" style="width: 650px" />
      </el-form-item>
      <el-form-item label="客户需求">
        <el-input v-model="form.name" style="width: 500px" />
      </el-form-item>
      <el-form-item label="公海客户">
        <el-checkbox-group v-model="form.seaCustomer">
          <el-checkbox
            name="type"
            @click="form.seaCustomer = !form.seaCustomer"
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
  <el-drawer v-model="dialogVisible1"> </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import useMyClient from '@/stores/customer/myclient.js'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ArrowDown } from '@element-plus/icons-vue'

// 我的客户store仓库
const myclient = useMyClient()
// 控制添加或修改客户信息对话框的显示与隐藏
let dialogVisible = ref(false)
// 控制添加联系人抽屉的显示和隐藏
let dialogVisible1 = ref(false)
// 当前页数
const currentPage = ref(1)
// 每页数据
const pageSize = ref(5)
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

const form = ref({
  id: '',
  name: '',
  desc: '',
  seaCustomer: false
})
// 用于搜索的客户名称关键词
const name = ref('')

// 点击添加按钮的回调
const addMyClinet = () => {
  dialogVisible.value = true
}
// 添加按钮确定回调
const save = () => {
  form.value.id = ''
  dialogVisible.value = false
}
// 添加联系人按钮回调
const addContact = (row) => {
  alert('添加联系人', row)
  console.log(row)
}
// 添加沟通记录按钮回调
const addCommunicate = (row) => {
  alert('添加沟通记录', row)
}
// 添加服务记录按钮回调
const addService = (row) => {
  alert('添加服务记录', row)
}
// 添加销售机会按钮回调
const addOpportunity = (row) => {
  alert('添加销售机会', row)
}
// 添加合同按钮回调
const addContract = (row) => {
  alert('添加合同', row)
}
// 详情按钮回调
const detail = (row) => {
  alert('详情', row)
}
// 修改按钮回调
const modify = (row) => {
  form.value.id = row.id
  dialogVisible.value = true
}
// 删除按钮回调
const Deletes = (row) => {
  alert('删除', row)
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
