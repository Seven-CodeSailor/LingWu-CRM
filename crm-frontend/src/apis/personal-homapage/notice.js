import request from '@/apis/request.js'
// 获取 文章分类
export const notGetChannelsService = () => request.get('/my/cate/list_test')
//添加 文章分类
export const notAddChannelsService = (data) => request.get('/my/cate/add', data)
//编辑 文章分类
export const notEditChannelsService = (data) => 
    request.put('/my/cate/info', data)

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
          'http://127.0.0.1:4523/m1/3492155-0-default/my/cate/list_test',
          {
            ...data
          }
        )
          .then((response) => {
            success(response)
          })
          .catch((error) => {
            fail(error)
          })
      }