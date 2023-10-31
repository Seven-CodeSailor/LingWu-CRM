<template>
  <div class="product-type">
    <BaseDataList
      title="商品类型"
      :table-column-attribute="tableColumnAttribute"
      :table-data="tableData"
      :handle-delete="handleDelete"
      :handle-edit="handleEdit"
      :total="888"
      :page-sizes="[5, 10, 15]"
      @update-switch-state="handSwitchState"
      ref="baseDataListRef"
    >
      <template #ico
        ><el-icon><icon-message-box /></el-icon
      ></template>
    </BaseDataList>
    <ProductTypeForm></ProductTypeForm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import ProductTypeForm from '../components/FormCom/ProductTypeForm.vue'
const tableColumnAttribute = ref([
  {
    prop: 'attrName',
    label: '类型名称'
  },
  {
    prop: 'detailedTypeInfoDTOList',
    label: '属性标签'
  },

  {
    prop: 'visible',
    label: '是否启用',
    useSwitch: true
  },
  {
    prop: 'sort',
    label: '排序',
    sortable: true
  }
])
const handleDelete = () => {}
const handleEdit = () => {}

const tableData = [
  {
    attrName: '鸡蛋🥚',
    detailedTypeInfoDTOList: '鸡',
    visible: true,
    sort: 99
  },
  {
    attrName: '鸡蛋🥚',
    detailedTypeInfoDTOList: '鸡',
    visible: false,
    sort: 99
  },
  {
    attrName: '鸡蛋🥚',
    detailedTypeInfoDTOList: '鸡',
    visible: true,
    sort: 99
  }
]
const baseDataListRef = ref(null)
const handSwitchState = (state, row) => {
  console.log('调用后端的接口发请求修改开关的state后才能真正改变开关的状态')
  console.log('开关的状态已被修改，为：', state)
  console.log('当前行的数据', row)
  // 开启loading
  baseDataListRef.value.openSwitchLoading =
    !baseDataListRef.value.openSwitchLoading
  // 关闭loading  模拟异步请求
  setTimeout(() => {
    baseDataListRef.value.openSwitchLoading =
      !baseDataListRef.value.openSwitchLoading
  }, 1000)
}
</script>

<style lang="scss" scoped>
.product-type {
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
  }
}
</style>
