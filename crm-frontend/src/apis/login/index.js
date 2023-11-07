/*
 * @Author: BINGWU
 * @Date: 2023-10-26 20:52:05
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-06 20:20:03
 * @FilePath: \crm-frontend\src\apis\login\index.js
 * @Describe:
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '../request'
import { userStore } from '@/stores/user'

// 定义一个功能模块基础url，方便替换
const currBaseUrl = '/login/'

/**
 * 登录接口
 * @param data 登录数据
 * @param success 登录成功回调
 * @param fail 登录失败回调
 */
export const login = (data, success, fail) => {
  const $store = userStore()
  Request.requestForm(Request.POST, currBaseUrl + 'auth-login', data)
    .then((data) => {
      // 记录Token到本地
      if (data.data) {
        // seven 测试销售机会接口的token
        // data.data.token =
        //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkzNjg1MzMsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.DkSnoba1HLvVhDr8GvQ-EO7DvF6tpGTBFS75_52ure1QUZWGBUrZ0dcF-SnheoEDMh991mrO-KRohWBKG2uuCGdbGb2o8O5rEQs8AM9rMU2ybYjqLgNG7BsYrLQL-d8D43MwSBMDWMg3tf7uG3ugtjWFbAhZ3qVmBQpDZodcCOaIYz-558LeuCTlqzL5oe5fKozws1Vns7A8BEZXssj2D5454qWVpRnQQm-a8WOw8rqneWgXj0X5YDeSFrhXnUb-4KiVn4gKLmQbijpUL8wMFgq18scf-bXGHUF_RNyQnl-vv-MfyOiXsCKCWRdRi-79s43zpaEF20zbxoUs3B_4dw'
        // 冰雾测试接口的token
        // data.data.token =
        //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkyMDQyMzcsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.inkPd2E0H2DZZrCuhErMp4qXaSrHfaUfX6XN4BGe-1Hfajegeb0RiltDLjaGmDI1WUetI7iy6NaES6PTqquWgNMqJiECJl3iq8ouOS6BNF7zwZ-dtd7hh7iVtFwPUY6opIJEaLqly-Yy4QWyFcWBXg0-cbuIzVSmdFkVFY2jm2Gm2gKzVRxW3Y5G2ioS61uokszlwRMXuGonVb6lZ-Epdce1AH7sBySMUAPv0lqXLfj6H4HVjJ0ZbQNacfJTgjer-H68lSKzPmNmSfyEseXVTUnXtXeqossijuKHEtzfhgfDlQPJMr-yGxzAndsyIiTmJQCUOs3uyMY32oYCGR6KaQ'
        //qianmeng 回款管理token
        data.data.token =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkzODExMTAsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.hu2fShFPnGXIlbwkPxm3vFTNwx8UdBhJaDwxFuiZJyRcC9lYcyqmzyrWkvA6b8PxiPSU957vzHt44feklBt7i_K-aKbCr5HhLx-0xV27W94kBVSscQWfImzRX1-FOJAHe0AxBfs5iT1bKeDgCoOz1kj3eDrBMujAh1P07ro0gbEa0gyttuIw1UTOVnTIgn8qCwQAi2EedVVIk3Hs5PfBbwhsjC5yklHtug7URpTRi0C1HHEOE9cINqCI_x6jmABCYEFypsXzTFgjs8QZJ0KW05Miae6hw0g39n4N2511edrfKvjNiMN8tJWQqmfcY73Dql6jh2JQARD7sEH6Ngv7xw'
        $store.setToken(data.data)
        // 执行成功回调
        success()
        return
      }
      // 执行失败回调
      fail()
    })
    .catch((err) => {
      // 打印错误信息
      console.warn(err)
      // 执行失败回调
      fail()
    })
}
