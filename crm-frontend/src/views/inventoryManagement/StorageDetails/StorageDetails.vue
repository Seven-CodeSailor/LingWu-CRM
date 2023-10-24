<script setup>
import { House, Refresh, Search, QuestionFilled } from '@element-plus/icons-vue'
import Table from '@/components/table/Table.vue'
import BulkOPe from '@/components/BulkOpe/BulkOpe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
// import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// 控制表格是否加载
const loading = ref(false)
const update = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}
// 表格数据
const tableData = ref([
  {
    商品ID: '2016-05-03',
    商品名称: 'Tom',
    商品类型: '男装',
    仓库名称: '01仓库',
    对应入库单: '天河一期',
    入库时间: '2023-10-24',
    备注: ''
  },
  {
    商品ID: '2016-05-02',
    商品名称: 'Tom',
    商品类型: '男装',
    仓库名称: '01仓库',
    对应入库单: '天河一期',
    入库时间: '2023-10-24',
    备注: ''
  },
  {
    商品ID: '2016-05-04',
    商品名称: 'Tom',
    商品类型: '男装',
    仓库名称: '01仓库',
    对应入库单: '天河一期',
    入库时间: '2023-10-24',
    备注: ''
  },
  {
    商品ID: '2016-05-01',
    商品名称: 'Tom',
    商品类型: '男装',
    仓库名称: '01仓库',
    对应入库单: '天河一期',
    入库时间: '2023-10-24',
    备注: ''
  }
])
// 选择框数据
const options = ref([
  {
    value: 'Option1',
    label: '唱'
  },
  {
    value: 'Option2',
    label: '跳'
  },
  {
    value: 'Option3',
    label: 'rap'
  },
  {
    value: 'Option4',
    label: '篮球和只因'
  }
])
// 分页器
const currentPage4 = ref(4)
const pageSize4 = ref(100)
</script>
<template>
  <!-- <div>这里是入库明细页面</div> -->
  <el-card class="box-card">
    <template #header>
      <div class="head">
        <div class="show0">
          <el-icon style="vertical-align: middle" size="16">
            <House />
          </el-icon>
          <p>入库明细列表</p>
        </div>
        <div class="show">
          <el-icon><QuestionFilled /></el-icon>
          <p>操作说明</p>
        </div>
      </div>
    </template>
    <div class="wrap">
      <div class="wrap1">
        <!-- 刷新 -->
        <el-button @click="update" type="info" circle>
          <el-icon><Refresh /></el-icon>
        </el-button>
        <!-- 批量导出 -->
        <BulkOPe :excelData="tableData" :getOpt="() => [0, 1, 2]">
          <template #excel> </template>
          <template #file> </template>
          <template #print> </template>
        </BulkOPe>
      </div>
      <div class="wrap2">
        <!-- 下拉选择框 -->
        <ChooseSelect
          :options="options"
          des="请选择你要查找的内容"
        ></ChooseSelect>
        <el-button type="primary" circle color="#626aef">
          <el-icon><Search /></el-icon>
        </el-button>
      </div>
    </div>
    <!-- 表格 -->
    <Table :dataArr="tableData" :isSelect="true" :isLoading="loading"></Table>
    <!-- 分页器 -->
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="jumper, sizes, prev, pager, next,total "
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>
<style>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head p {
  padding: 0 8px;
}
.box-card {
  width: 100vw;
  height: 100vh;
}
.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 20px;
}
button {
  margin: 0 10px;
}
.footer {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  width: 100%;
}
.show0 {
  display: flex;
  align-items: center;
}
.show {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
</style>
<script setup></script>
<template>
  <div class="storage_details">
    <BaseDataList
      :table-column-attribute="tableColumnAttribute"
      :use-operate-column="false"
      :page-sizes="[5, 10, 15]"
      :total="99"
    >
      <template #menu>
        <div class="menu">
          <div class="left">
            <el-button style="margin-right: 4px">
              <el-icon style="margin-right: 4px"><icon-refresh /></el-icon
              >刷新</el-button
            >
            <BulkOPe :excelData="excel" :getOpt="() => [0, 1, 2]">
              <template #excel>
                <div>
                  下拉选择：<ChooseSelect
                    @update:cid="changecid"
                  ></ChooseSelect>
                </div>
              </template>
            </BulkOPe>
          </div>
          <div class="right">
            <el-input
              v-model="input"
              placeholder="输入商品名称或者SKU名称"
              style="margin-right: 4px"
            />
            <DropDown></DropDown>
            <el-button type="primary" style="margin-left: 4px">
              <el-icon style="margin-right: 4px"><icon-search /></el-icon
              >搜索</el-button
            >
          </div>
        </div>
      </template>
    </BaseDataList>
  </div>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import DropDown from '@/components/DropDown/DropDown.vue'
const tableColumnAttribute = [
  {
    prop: 'goodsIdAndSkuId',
    label: '商品ID/SKU ID'
  },
  {
    prop: 'goodsNameAndSkuNmae',
    label: '商品名称/SKU 名称',
    sortable: true
  },
  {
    prop: 'number',
    label: '数量'
  },
  {
    prop: 'categoryName',
    label: '商品类型'
  },
  {
    prop: 'storeName',
    label: '仓库名称'
  },
  {
    prop: 'intoIntro',
    label: '对应入库单'
  },
  {
    prop: 'intoTime',
    label: '入库时间'
  },
  {
    prop: 'remarks',
    label: '备注'
  }
]

const excel = () => {
  return [
    {
      性别: '男',
      年龄: '19',
      爱好: '唱',
      name: 'a'
    },
    {
      性别: '女',
      年龄: '21',
      爱好: 'rap',
      address: 'b'
    },
    {
      性别: '男',
      年龄: '22',
      爱好: '篮球',
      habb: 'c'
    }
  ]
}
const changecid = (value) => {
  //发送网络请求获取数据
  console.log(value)
}
</script>

<style lang="scss" scoped>
.storage_details {
  width: 100%;
  height: 100%;
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      height: 40px;
    }
    .right {
      height: 40px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
