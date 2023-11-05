import Request from '../request'


/**
 * @description: 删除销售合同数据列表  参数字段配置的路径:  crm-frontend\src\stores\salesmanager\SalesContract.js
 * @param {*} data
 * 
 */

export const deleteSales = (data) => {
  return Request.requestJson(
    Request.DELETE,
    'https://mockapi.eolink.com/fhdz9TQ7632232d76db4f62838f5c8793d22b77760ead7b/get-sales-contract-list',
    {
      params:{
        ...data
      }
    }
  )
}