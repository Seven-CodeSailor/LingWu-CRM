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
