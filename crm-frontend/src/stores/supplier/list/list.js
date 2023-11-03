import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSupplierList = defineStore('supplierList', () => {
  // 总页数
  const pageTotal = ref(0)
  const tableData = ref([
    {
      supplierId: '', // 供应商ID
      supplierName: '', //供应商名称
      ecoType: '', //经济类型
      indType: '', //行业类型
      contact: '', //联系人
      telephone: '', //电话号码
      fax: '', // 传真
      email: '', //邮箱
      address: '', //联系地址
      intro: '' //介绍
    }
  ])
  const setTableData = (data) => {
    tableData.value = data
  }
  // 新增或修改供应商信息
  const addOrUpdateSupplier = ref({
    supplierName: '', //供应商名称
    ecoType: '', //经济类型
    indType: '', //行业类型
    contact: '', //联系人
    telephone: '', //电话号码
    fax: '', // 传真
    email: '', //邮箱
    address: '', //联系地址
    intro: '' //介绍
  })

  //重置数据
  const addOrUpdateSupplierReset = () => {
    addOrUpdateSupplier.value = {
      supplierId: '', //供应商Id
      supplierName: '', //供应商名称
      ecoType: '', //经济类型
      indType: '', //行业类型
      contact: '', //联系人
      telephone: '', //电话号码
      fax: '', // 传真
      email: '', //邮箱
      address: '', //联系地址
      intro: '' //介绍
    }
  }

  // 存储联系人的数据
  let contactInfo = ref({
    id: '',
    name: '',
    gender: '',
    mobile: '',
    position: '',
    tel: '',
    qq: '',
    email: '',
    address: '',
    customerName: ''
  })
  // 重置数据
  const contactReset = () => {
    contactInfo.value = {
      id: '',
      name: '',
      gender: '',
      mobile: '',
      position: '',
      tel: '',
      qq: '',
      email: '',
      address: '',
      customerName: ''
    }
  }
  return {
    pageTotal,
    tableData,
    setTableData,
    addOrUpdateSupplier,
    addOrUpdateSupplierReset,
    contactInfo,
    contactReset
  }
})
export default useSupplierList
