//新增回款记录
const addCollectionRecord = (data, success, fail) => {
  Request.requestJson(Request.POST, +'/CollectionRecord/add', data)
    .then((data) => {
      if (data.data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      console.warn(err)
      fail()
    })
}

const deleteCollectionRecord = (data, success, fail) => {
  Request.requestJson(Request.DELETE, +'/collectionRecord/delete', data)
    .then((data) => {
      if (data.data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      console.warn(err)
      fail()
    })
}

export { addCollectionRecord, deleteCollectionRecord }
