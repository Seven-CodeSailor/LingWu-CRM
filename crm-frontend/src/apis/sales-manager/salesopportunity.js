import Request from '../request'


/**
 * @description: 获取销售机会分页列表  参数字段配置的路径:  crm-frontend\src\stores\salesmanager\SalesContract.js
 * @param {*} data
 * 
 */

export const querySalesOpportunity = (data) => {
  return Request.requestJson(
    Request.GET,
    //TODO
    'https://mockapi.eolink.com/fhdz9TQ7632232d76db4f62838f5c8793d22b77760ead7b/​opportunities​/sales-oppo-list',
    {
      params:{
        ...data
      }
    }
  )
}