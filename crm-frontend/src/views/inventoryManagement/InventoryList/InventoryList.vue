
<template>
  <el-card class="box-card">
    <template #header>
      <div class="head">
        <div class="show0">
          <el-icon style="vertical-align: middle" size="16">
            <HomeFilled />
          </el-icon>
          <p>库存清单列表</p>
        </div>
        <div class="show">
          <el-button>
            <el-icon><QuestionFilled /></el-icon>
            <p>操作说明</p>
          </el-button>
        </div>
      </div>
    </template>
    <div class="wrap">
      <div class="wrap1">
        <!-- 刷新 -->
        <el-button @click="refresh" type="info" circle style="margin-right:28px;">
          <el-button>
            <el-icon>
              <Refresh />
            </el-icon>
            刷新
          </el-button>
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
          des="请输入商品名称或者SKU名称"
        >
        </ChooseSelect>
        <el-button 
        type="primary" 
        :icon="Search" 
        style="margin-left: 10px; padding-left: 10px"
        >
        搜索
        </el-button>
      </div>
    </div>

    <!-- 表格内容区 -->
    <Table :dataArr="tableData" :isSelect="true" :isLoading="loading"></Table>

    <!-- 分页器 -->
    <div class="footer">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>

  </el-card>
</template>


<script setup>
import { HomeFilled, Refresh, Search, QuestionFilled } from '@element-plus/icons-vue'
import Table from '@/components/table/Table.vue'
import BulkOPe from '@/components/BulkOpe/BulkOpe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'

// 以下为尝试引用接口数据--------
// import useInventoryStore from '@/stores/inventory.js'
// 以上为尝试引用接口数据--------

// 控制表格是否加载
const loading = ref(false)
// 将update更改为refresh
const refresh = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 表格数据
const tableData = ref([
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  {
    商品ID: '123456',
    商品名称: '手机',
    库存数量: '999',
    商品类型: '',
    仓库名称: '海外仓1号',
    销售价格: '999.00',
    成本价格: '111.00',
    成本金额: '',
    预计利润: '',
    原厂编码: '',
  },
  
])

// 选择框数据
const options = ref([
  {
    value: 'Option1',
    label: '供应商名称',
  },
  {
    value: 'Option2',
    label: '通讯地址'
  },
])

// 分页器
// 定义分页数据----------
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(400)

// 点击分页触发事件-------------------
const handleSizeChange = (val) => {
  // console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  // console.log(`current page: ${val}`)
  // emit('getCurrentPage', val)
}

// 获取页码数--点击---------------
// const getCurrentPage = (val) => {
//   getList(val)
// }


</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.head .p {
  padding: 0 8px;
}

.box-card {
  width: 100%;
  height: 100%;
}

.wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 20px;
}

.button {
  margin: 10px;
}

.table {
  width: 100%;
  display: inline-block;
}

.footer {
  display: flex;
  justify-content: right;
  margin: 26px -12px;
  width: 100%;
  /* height: 20%; 没变化,观望一下*/
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
