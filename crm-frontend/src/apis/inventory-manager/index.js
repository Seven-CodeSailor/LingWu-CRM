import Request from '../request'

// 定义一个功能模块基础url，方便替换
const currBaseUrl = '/inventory-manager/'

/**
 * 获取入库明细项列表
 * @param {*} data 获取入库明细的数据
 * @param {*} success 成功获取数据后的回调
 * @param {*} fail 获取数据失败的回调
 */
export const queryStorageDetails = (data) => {
  // 获取不到数据，后端只是提供了文档，未实现接口，这里只是一个参考，可在此模拟数据，然后存在pinia里面
  // 模拟数据不用通过请求，直接写死数据，下面这段可以注释掉
  return Request.requestJson(
    Request.GET,
    currBaseUrl + 'query-storage-details',
    data
  )
}
// 这个是mock测试用例,暂时别删
export const getInventortOutTableList = (theUrl) => {
  return Request.requestJson(Request.GET, theUrl)
}
