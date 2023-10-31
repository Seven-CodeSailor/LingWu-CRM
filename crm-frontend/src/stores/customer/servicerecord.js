import { defineStore } from 'pinia'
import { ref } from 'vue'

const useServiceRecord = defineStore('serviceRecord', () => {
  let tableData = ref([
    {
      customeId: '', // 客户id
      linkmanId: '', //联系人id
      services: '', // 服务类型
      servicesmodel: '', //服务方式
      price: '', // 价格
      status: '', //服务记录状态 1=无需处理，2未处理，3=处理中，4处理完成
      serviceTime: '', // 服务日期
      tlen: '', //服务时长
      content: '', //服务内容
      intro: '', //备注
      customerName: '', //客户姓名
      linkmanName: '' //联系人姓名
    }
  ])

  // 设置表格数据
  const setTableData = (data = []) => {
    tableData.value = data
  }

  // 添加或修改数据的暂存区
  let temp = ref({
    customeId: '', // 客户id
    linkmanId: '', //联系人id
    services: '', // 服务类型
    servicesmodel: '', //服务方式
    price: '', // 价格
    status: '', //服务记录状态 1=无需处理，2未处理，3=处理中，4处理完成
    serviceTime: '', // 服务日期
    tlen: 0, //服务时长
    content: '', //服务内容
    intro: '', //备注
    customerName: '', //客户姓名
    linkmanName: '' //联系人姓名
  })

  const tempReset = () => {
    temp.value = {
      customeId: '', // 客户id
      linkmanId: '', //联系人id
      services: '', // 服务类型
      servicesmodel: '', //服务方式
      price: '', // 价格
      status: '', //服务记录状态 1=无需处理，2未处理，3=处理中，4处理完成
      serviceTime: '', // 服务日期
      tlen: 0, //服务时长
      content: '', //服务内容
      intro: '', //备注
      customerName: '', //客户姓名
      linkmanName: '' //联系人姓名
    }
  }

  return {
    tableData,
    setTableData,
    temp,
    tempReset
  }
})

export default useServiceRecord
