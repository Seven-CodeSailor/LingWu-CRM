import Request from '../request'

//请求接口的模板
// export const test = async (data, success, fail) => {
//     await Request.requestJson(
//       Request.GET,
//       'https://mockapi.eolink.com/69jekXFeb89500c132462100d3745b0046ecd1264eeb224/test',
//       {

//       }
//     )
//       .then((response) => {
//         success(response)
//       })
//       .catch((error) => {
//         fail(error)
//       })
//   }

export const list_test = async (data, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mock.apifox.cn/m1/3500676-0-default/getdata',
    {}
  )
    .then((response) => {
      console.log(1)
      success(response)
    })
    .catch((error) => {
      console.log(2)
      fail(error)
    })
}
