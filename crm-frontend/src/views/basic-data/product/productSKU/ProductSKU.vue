<template>
  <div class="productsku">
    <BaseDataList
      title="商品SKU列表"
      :table-column-attribute="tableColumnAttribute"
      :table-data="tableData"
      :handle-delete="handleDelete"
      :handle-edit="handleEdit"
    >
      <template #ico
        ><el-icon><icon-message-box /></el-icon
      ></template>
      <template #menu>
        <div class="menu">
          <div class="left">
            <el-button type="primary" style="margin-right: 8px"
              >发布商品</el-button
            >
            <BulkOPe
              :excelData="t1"
              :getOpt="() => [0]"
              excelName="入库明细.xlsx"
              tableName="入库明细的sheet表"
            >
            </BulkOPe>
          </div>
          <div class="right">
            <el-input
              v-model="inputValue"
              placeholder="输入商品名称"
              style="margin-right: 4px"
            />
            <DropDown
              v-model:input-value1="inputValue1"
              v-model:input-value2="inputValue2"
              v-model:input-value3="inputValue3"
              input-title1="店铺名称"
              input-title2="手机号"
              input-title3="联系地址"
              topInputTitle="供应商名称"
              bottomInputTitle="通信地址"
              :get-drop-down="() => [0, 1, 2, 3]"
              @handle-search="handleSearch"
            ></DropDown>
            <el-button
              type="primary"
              style="margin-left: 4px"
              @click="searchDetails"
            >
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
import { ref } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'

const tableColumnAttribute = ref([
  {
    prop: 'goodsName',
    label: '商品名称'
  },
  {
    prop: 'goodsFeature',
    label: '商品规格'
  },
  {
    prop: 'number',
    label: '库存',
    sortable: true
  },
  {
    prop: 'price',
    label: '销售价格',
    sortable: true
  },
  {
    prop: 'marketPrice',
    label: '市场价格',
    sortable: true
  },
  {
    prop: 'costPrice',
    label: '成本价格',
    sortable: true
  },
  {
    prop: 'costTotalMoney',
    label: '成本总金额',
    sortable: true
  },
  {
    prop: 'profit',
    label: '预计利润',
    sortable: true
  }
])
const handleDelete = () => {}
const handleEdit = () => {}

const tableData = [
  {
    goodsName: '鸡蛋🥚',
    goodsFeature: '2.5公斤',
    number: 250,
    price: 1999,
    marketPrice: 800,
    costPrice: 10,
    costTotalMoney: 300,
    profit: 99999
  },
  {
    goodsName: '鸡蛋🥚',
    goodsFeature: '2.5公斤',
    number: 250,
    price: 1999,
    marketPrice: 800,
    costPrice: 10,
    costTotalMoney: 300,
    profit: 99999
  },
  {
    goodsName: '鸡蛋🥚',
    goodsFeature: '2.5公斤',
    number: 250,
    price: 1999,
    marketPrice: 800,
    costPrice: 10,
    costTotalMoney: 300,
    profit: 99999
  }
]
const inputValue = ref('')
const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const handleSearch = () => {
  console.log('serchSearch')
}
</script>

<style lang="scss" scoped>
.productsku {
  width: 100%;
  height: 100%;
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
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
