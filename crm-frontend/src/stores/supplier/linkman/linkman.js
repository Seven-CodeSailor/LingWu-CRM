import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSupplierLinkman = defineStore('supplierLinkman', () => {
  // 总页数
  const pageTotal = ref(0)
  const tableData = ref([
    {
      supplierId: '', // 供应商ID
      supplierName: '', //供应商名称
      gender: '', //性别
      position: '', //职位
      tel: '', //座机
      mobile: '', //手机
      qq: '', // QQ      fax: '', // 传真
      email: '', //邮箱
      zipcode: '', //邮政编码
      address: '', //联系地址
      intro: '', //介绍
      createUserId: '', //创建用户ID
      createTime: '', //创建时间
      linkmanId: '', //供应商联系人ID
      name: '' // 供应商联系人名称
    }
  ])
  const setTableData = (data = []) => {
    tableData.value = data
  }

  //新增或修改供应商联系人
  const tempLinkData = ref({
    supplierId: '', // 供应商ID
    supplierName: '', //供应商名称
    gender: '', //性别
    position: '', //职位
    tel: '', //座机
    mobile: '', //手机
    qq: '', // QQ      fax: '', // 传真
    email: '', //邮箱
    zipcode: '', //邮政编码
    address: '', //联系地址
    intro: '', //介绍
    createUserId: '', //创建用户ID
    createTime: '', //创建时间
    linkmanId: '', //供应商联系人ID
    name: '' // 供应商联系人名称
  })

  // 重置数据
  const tempLinkDataReset = () => {
    tempLinkData.value = {
      supplierId: '', // 供应商ID
      supplierName: '', //供应商名称
      gender: '', //性别
      position: '', //职位
      tel: '', //座机
      mobile: '', //手机
      qq: '', // QQ      fax: '', // 传真
      email: '', //邮箱
      zipcode: '', //邮政编码
      address: '', //联系地址
      intro: '', //介绍
      createUserId: '', //创建用户ID
      createTime: '', //创建时间
      linkmanId: '', //供应商联系人ID
      name: '' // 供应商联系人名称
    }
  }
  return {
    pageTotal,
    tableData,
    setTableData,
    tempLinkData,
    tempLinkDataReset
  }
})
export default useSupplierLinkman
