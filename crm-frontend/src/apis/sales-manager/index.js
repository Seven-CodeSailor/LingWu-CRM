import Request from '../request'


/**
 * 查询销售合同列表
 *
 * @param {object} data - The data object containing the parameters for the query.
 * @return {Promise} A promise that resolves to the response from the API.
 */
export const querySalesContractList = (data) => {

  return Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/fhdz9TQ7632232d76db4f62838f5c8793d22b77760ead7b/test',
    {
      params:{
        ...data
      }
    }
  )
}