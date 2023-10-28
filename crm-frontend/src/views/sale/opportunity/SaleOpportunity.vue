<!--
 * @Author: seven 1473008948@qq.com
 * @Date: 2023-10-26 21:58:11
 * @LastEditors: seven 1473008948@qq.com
 * @LastEditTime: 2023-10-28 20:25:21
 * @FilePath: \zero-one-crmsys\crm-frontend\src\views\sale\opportunity\SaleOpportunity.vue
-->

<template>
  <BaseDataList
    class="card"
    :title="sendData.title"
    :msg="sendData.opreateTip"
    :table-column-attribute="sendData.tableColumnAttribute"
    :table-data="sendData.tableData"
    :page-sizes="sendData.pageSizes"
    :total="sendData.total"
    useDropdownMenu="true"
    :dropdownMenuActionsInfo="sendData.dropdownMenuActionsInfo"
    useOperateColumn="true"
    @update-table-data="get"
    ref="baseDataListRef"
  >
    <template #menu>
      <!-- 表格上面一行 -->
      <div class="menu">
        <div class="left">
          <el-button type="primary" :icon="Plus" style="margin: 0"
            >添加数据</el-button
          >
          <el-button @click="changeLoadAnimation" class="refresh"
            >刷新</el-button
          >
          <!-- 下拉选择框 -->
          <BulkOPe :excelData="getRows" :getOpt="() => [0, 2, 3, 4]">
            <template #excel>
              <div>
                下拉选择：<ChooseSelect @update:cid="changecid"></ChooseSelect>
              </div>
            </template>
          </BulkOPe>
          <el-button @click="deleteData" type="waring" color="#FF3800"
            >删除所选</el-button
          >
        </div>
        <div class="right">
          <el-input
            v-model="inputValue"
            placeholder="输入商品机会名称"
            style="margin-right: 4px"
          />
          <DropDown
            :getDropDown="() => [0, 1, 2, 3]"
            v-model:topInputValue="topInputValue"
            v-model:bottomInputValue="bottomInputValue"
            inputTitle1="客户名称"
            inputTitle2="联系人名称"
            inputTitle3="销售机会名称"
            @handle-search="handleSearch"
          ></DropDown>
          <el-button
            type="primary"
            style="margin-left: 4px"
            @click="searchDetails"
          >
            <el-icon style="margin-right: 4px"><icon-search /></el-icon>搜索
          </el-button>
        </div>
      </div>
    </template>
    <!-- 插槽显示图标 -->
    <template #ico>
      <el-icon><SoldOut /></el-icon>
    </template>
  </BaseDataList>
</template>

<script setup>
import BaseDataList from '@/components/DataList/BaseDataList.vue'
import BulkOPe from '@/components/BulkOpe/BulkOPe.vue'
import ChooseSelect from '@/components/chooseSelect/ChooseSelect.vue'
import { ref } from 'vue'
import DropDown from '@/components/DropDown/DropDown.vue'
import { SoldOut, Plus } from '@element-plus/icons-vue'

const inputValue = ref('')

// 批量删除操作
const deleteData = () => {
  ElMessageBox.confirm('该操作将会删除所勾选列的所有数据，是否确认？', '注意', {
    confirmButtonText: '确认删除',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消！'
      })
    })
}
// 数据传递
const sendData = {
  tableColumnAttribute: [
    {
      prop: 'sale_name',
      label: '销售机会主题',
      sortable: false
    },
    {
      prop: 'cus_name',
      label: '客户姓名',
      sortable: false
    },
    {
      prop: 'happen_date',
      label: '发现日期'
    },
    {
      prop: 'end_date',
      label: '预计签单日期'
    },
    {
      prop: 'money',
      label: '金额'
    },
    {
      prop: 'now_state',
      label: '当前阶段'
    },
    {
      prop: 'intro',
      label: '需求'
    }
  ],
  tableData: [
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    },
    {
      sale_name: '任天堂游戏公司',
      cus_name: '任天堂',
      happen_date: '2021-10-12',
      end_date: '2021-10-20',
      money: 230000,
      now_state: '筹备阶段',
      intro: '天王盖地虎'
    }
  ],
  title: '销售管理',
  opreateTip: '多一眼看一眼就会爆炸',
  dropdownMenuActionsInfo: [
    {
      command: '修改',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('带着row的数据，拿id发请求拿到入库单明细', row)
      },
      actionName: '修改'
    },

    // 操作列表的删除操作 还需完善
    {
      command: '删除',
      // row为当前行的数据
      handleAction: (row) => {
        console.log('带着row的数据，拿id发请求拿到入库单明细', row)
      },
      actionName: '删除'
    }
    // {
    //   command: '添加',
    //   // row为当前行的数据
    //   handleAction: (row) => {
    //     console.log(
    //       'row.id发起添加请求，dialog弹出？然后dialog里submit的时候确认入库？',
    //       row
    //     )
    //   },
    //   actionName: '添加'
    // },
    // {
    //   command: '删除',
    //   // row为当前行的数据
    //   handleAction: (row) => {
    //     console.log('删除', row)
    //   },
    //   actionName: '删除'
    // }
  ],
  // 传入删除操作的函数就会显示删除按钮
  handleDelete: (row) => {
    console.log('删除', row)
  },
  handleEdit: (row) => {
    console.log('编辑', row)
  },
  // 分页数组
  pageSizes: [5, 10, 15],
  total: 100
}

const baseDataListRef = ref()
//分页器组件点击调用get
const get = (pageSize, currentPage) => {
  console.log('调用父组件的更新数据的函数')
  console.log('pageSize', pageSize)
  console.log('currentPage', currentPage)
}

const getRows = () => {
  // 获取组件暴露出来的rows
  console.log('rows', baseDataListRef.value.rows)
}
const changeLoadAnimation = () => {
  // 关闭表格加载动画
  baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  setTimeout(() => {
    baseDataListRef.value.openLoading = !baseDataListRef.value.openLoading
  }, 500)
}

// const excel = () => {
//   console.log('s', baseDataListRef.value.rows)
// }
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 100%;
}

button {
  margin-left: 10px;
  margin-right: 10px;
}

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

#getCol {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
