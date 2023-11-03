import Request from '@/apis/request'
//查询回款记录列表-搜索
const getCollectionRecordList = (pageParams, searchParams = {}) => {
  return Request.requestJson(Request.GET, '/collectionRecord/qurery', {
    ...pageParams,
    ...searchParams
  })
}
//新增回款记录
const addCollectionRecord = (data) => {
  return Request.requestJson(Request.POST, +'/CollectionRecord/add', data)
}
//删除回款记录
const deleteCollectionRecord = (data) => {
  return Request.requestJson(Request.DELETE, +'/collectionRecord/delete', data)
}

//导出回款记录
const exportCollectionRecord = (data) => {
  return Request.requestJson(Request.GET, +'/collectionRecord/download', data)
}

export {
  getCollectionRecordList,
  addCollectionRecord,
  deleteCollectionRecord,
  exportCollectionRecord
}
