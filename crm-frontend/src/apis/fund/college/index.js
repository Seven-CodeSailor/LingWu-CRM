import Request from '@/apis/request'

const getCollectionList = (pageParams, searchParams = {}) => {
  return Request.requestForm(
    Request.GET,
    '/collection-man/collectionplans/get-collectionplans',
    {
      ...pageParams,
      ...searchParams
    }
  )
}

const updateCollectionPlan = (data) => {
  return Request.requestForm(
    Request.PUT,
    '/collection-man/update-pay-plan',
    data
  )
}
export { getCollectionList, updateCollectionPlan }
