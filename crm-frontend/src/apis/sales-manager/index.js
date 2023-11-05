import Request from '../request'

export const deleteSales = (data) => {
  return Request.requestJson(
    Request.DELETE,
    'https://mockapi.eolink.com/fhdz9TQ7632232d76db4f62838f5c8793d22b77760ead7b/get-sales-contract-list',
    {
      params: {
        ...data
      }
    }
  )
}
