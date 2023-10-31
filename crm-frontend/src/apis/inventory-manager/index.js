import Request from '../request'

// 定义一个功能模块基础url，方便替换
// const currBaseUrl = '/inventory-manager/'
/**
 * 获取入库明细项列表
 * @param {*} data 获取入库明细的数据
 * @param {*} success 成功获取数据后的回调
 * @param {*} fail 获取数据失败的回调
 */
export const queryStorageDetails = async (data, success, fail) => {
  // 当有接口就直接使用下面的
  // Request.requestJson(Request.GET, currBaseUrl + 'query-storage-details', {
  //   params: {
  //     ...data
  //   }
  // })
  //   .then((response) => {
  //      success(response)
  //   })
  //   .catch((error) => {
  //     fail(error)
  //   })
  // 没有接口就使用下面mock模拟的数据
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/inventory-manager/query-storage-details1',
    {
      params: {
        ...data
      }
    }
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
// 以下是mock测试用例,暂时别删
export const getInventortOutTableList = (theUrl) => {
  return Request.requestJson(Request.GET, theUrl)
  // return new Promise((resolve) => {
  //   resolve(data)
  // }).then((res) => {
  //   // 写死数据
  //   // 将数据存储在pinia
  //   console.log(res)
  // })
}

export const queryInventoryList = async (data, success, fail) => {
  await Request.requestJson(
    Request.POST,
    'https://mock.apifox.cn/m1/3426132-0-default/inventory-manager/query-inventory-list',
    {
      params: { ...data }
    }
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
export const getOutTableList = () => {}

// 
export const test = async (data, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/69jekXFeb89500c132462100d3745b0046ecd1264eeb224/test',
    {
      
    }
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
