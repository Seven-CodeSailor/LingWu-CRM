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
        
        data.data.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkzODExMTAsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.hu2fShFPnGXIlbwkPxm3vFTNwx8UdBhJaDwxFuiZJyRcC9lYcyqmzyrWkvA6b8PxiPSU957vzHt44feklBt7i_K-aKbCr5HhLx-0xV27W94kBVSscQWfImzRX1-FOJAHe0AxBfs5iT1bKeDgCoOz1kj3eDrBMujAh1P07ro0gbEa0gyttuIw1UTOVnTIgn8qCwQAi2EedVVIk3Hs5PfBbwhsjC5yklHtug7URpTRi0C1HHEOE9cINqCI_x6jmABCYEFypsXzTFgjs8QZJ0KW05Miae6hw0g39n4N2511edrfKvjNiMN8tJWQqmfcY73Dql6jh2JQARD7sEH6Ngv7xw'
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
