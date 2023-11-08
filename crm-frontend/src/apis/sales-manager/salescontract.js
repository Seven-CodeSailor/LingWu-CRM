import Request from '../request'
const BASEURL = '/sales-contract'

/**
 * 获取销售合同数据列表(用于下拉列表查询数据)
 * @param {*} params 传递的参数
 * @returns
 */
export const getSalesContractDataForSelect = async (params) => {
  return await Request.requestJson(
    Request.GET,
    BASEURL + '/sales-contract/sales-cont-list',
    {
      params
    }
  )
}
/**
 * 获取销售合同唯一ID
 * @param {*} params 传递的参数
 * @returns
 */
export const getSalesContractIDList = async (params) => {
  return await Request.requestJson(
    Request.GET,
    BASEURL + '/sales-contract/get-salesNo/{contract_id}',
    {
      params
    }
  )
}

/**
 * 获取销售合同详情
 * @param {*} params
 * @returns
 */
export const getSalesContractDetails = async (params) => {
  return await Request.requestJson(
    Request.GET,
    BASEURL + '/sales-contract/get-sales-contract-detail-list',
    {
      params
    }
  )
}
/**
 * 获取销售合同查看清单的数据
 * @param {*} params
 * @returns
 */
export const getSalesContractList = async (params) => {
  return await Request.requestJson(
    Request.GET,
    BASEURL + '/sales-contract/get-contract-goods',
    {
      params
    }
  )
}
/**
 * 添加销售合同
 * @param {} params
 * @returns
 */
export const addNewContract = async (params) => {
  return await Request.requestForm(
    Request.POST,
    BASEURL + '/sales-contract/add-contract',
    params
  )
}

export const updateSalseContractData = async (params) => {
  return await Request.requestForm(
    Request.POST,
    BASEURL + '/sales-contract/modify-basic-info',
    params
  )
}

/**
 * @description: 删除销售合同数据列表  参数字段配置的路径:  crm-frontend\src\stores\salesmanager\SalesContract.js
 * @param {*} data
 *
 */
export const deleteSales = async (params) => {
  return await Request.requestJson(
    Request.DELETE,
    BASEURL + '/sales-contract/delete-contract/{contract_no}',
    {
      params
    }
  )
}
