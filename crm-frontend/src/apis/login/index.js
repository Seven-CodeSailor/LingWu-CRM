/*
 * @Author: BINGWU
 * @Date: 2023-10-26 20:52:05
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-08 11:01:20
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\login\index.js
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
        data.data.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTk1MTI5MzgsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.0KFl_To4CcDgAgjr81039z2Nzrx-aSEi_GaS331_FL27KLrC6uDZ1mU2AzkwGl1Cqw3xq1Q5f7Je6OTEJ9i2kx2bUueGYn22X5SK1L2_gZgLdNdBO6sqYnvdHWAnDKfJ0t6tk5Ef2LGG1R0xUzxqqpcKHfpKs74gtkHQyvzuZcUmieGkNLYeX3migZKP5295iCG1bIr1KQ7OLj3MkmRFD-Mes8o6D2OCaTnuONecq7YAVqkVO1JFYCks8Ed59uGsowaZJXABT77wE0OKm6eOT3TFudvaiwt9RVOLVhM9Vc1kaRjgHUCZmEZSyqNEAIrthmwlpvM8dVs7Mky9Y-4BOg'
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
