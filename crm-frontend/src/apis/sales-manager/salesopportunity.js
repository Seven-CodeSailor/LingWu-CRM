import Request from '../request'
const BASEURL = '/sales-opportunities'

// TODO 需要从公共接口补充获取客户名称列表   获取联系人名称列表 （用于输入表单下拉列表）

/**
 * @description: 获取销售机会分页列表
 * @param {*} params 请求参数
 *
 */
export const querySalesOpportunityList = async (params) => {
  return await Request.requestJson(
    Request.GET,
    //TODO
    BASEURL + '/sales-opportunities/query-invoices',
    params
  )
}

/**
 * 添加销售机会
 * @param {*} params
 * @returns
 */
export const addSalesOpportunity = async (params) => {
  return await Request.requestForm(
    Request.POST,
    BASEURL + '/sales-opportunities/insert-sales-opportunity',
    params
  )
}
/**
 * 修改销售机会
 * @param {*} params
 * @returns
 */
export const updateSalesOpportunity = async (params) => {
  return await Request.requestForm(
    Request.PUT,
    BASEURL + '/sales-opportunities/update-sales-opportunity',
    params
  )
}
/**
 * TODO 删除销售机会 支持批量删除
 * @param {*} params
 * @returns
 */
export const deleteSalesOpportunity = async (params) => {
  return await Request.requestJson(
    Request.DELETE,
    BASEURL + '/sales-opportunities/delete-sales-opportunity',
    params
  )
}

export const exportSalesOpportunity = async (params) => {
  return await Request.requestJson(
    Request.GET,
    BASEURL + '/sales-opportunities/export-sales-opportunity',
    params
  )
}

/**
 * TODO 批量发邮件
 * @param {*} params
 * @returns
 */
export const sendEmail = async (params) => {
  return await Request.requestForm(
    Request.POST,
    BASEURL + '/sales-opportunities/salesContract/Mail/',
    params
  )
}

/**
 * TODO 批量发短信
 * @param {*} params
 * @returns
 */
export const sendMails = async (params) => {
  return await Request.requestForm(
    Request.POST,
    BASEURL + '/sales-opportunities/salesContract/Sms/',
    params
  )
}
