// 部门管理仓库223
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDepartmentListApi } from '../../apis/organizationStructure/department'
const useDepartmentManageStore = defineStore('DepartmentManage', () => {
  // 定义部门名称结构树 的数据
  const DepartmentTree = ref()
  const setDepartmentTree = (dataList) => {
    DepartmentTree.value = dataList
  }

  // 定义部门名称列表数据
  const departmentSelect = ref([])
  const setDepartmentSelect = (dataArr) => {
    departmentSelect.value = dataArr
  }

  /**
   * 封装获取部门列表(分页+条件)api方法
   * @param {*} dataObj
   * {
   *  keywords: 部门关键字,
   *  pageIndex： 查询页码,
   *  pageSize: 查询条数,
   *  pid:父级部门id
   * }
   */
  const getDepartmentList = async (dataObj) => {
    const { keywords, pageIndex, pageSize, pid } = dataObj
    const $res = ref()
    await getDepartmentListApi(
      {
        keywords,
        pageIndex,
        pageSize,
        pid
      },
      (res) => {
        console.log('获取部门列表成功回调', res)
        $res.value = res
      }
    )
    return $res
  }
  return {
    DepartmentTree,
    setDepartmentTree,
    getDepartmentList,
    departmentSelect,
    setDepartmentSelect
  }
})
export default useDepartmentManageStore
