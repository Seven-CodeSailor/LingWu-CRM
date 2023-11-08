/*
 * @Author: BINGWU
 * @Date: 2023-10-26 20:52:05
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-08 22:01:26
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\login\index.js
 * @Describe:
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
import Request from '../request'
import { userStore } from '@/stores/user'

// 定义一个功能模块基础url，方便替换
const currBaseUrl = '/login'

/**
 * 登录接口
 * @param data 登录数据
 * @param success 登录成功回调
 * @param fail 登录失败回调
 */
export const login = (data, success, fail) => {
  const $store = userStore()
  Request.requestForm(Request.POST, currBaseUrl + '/auth-login', data)
    .then((res) => {
      console.log('res', res)
      //这里需要处理token
      // 记录Token到本地
      if (res.data) {
        data.data.token =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTk1MTI5MzgsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.0KFl_To4CcDgAgjr81039z2Nzrx-aSEi_GaS331_FL27KLrC6uDZ1mU2AzkwGl1Cqw3xq1Q5f7Je6OTEJ9i2kx2bUueGYn22X5SK1L2_gZgLdNdBO6sqYnvdHWAnDKfJ0t6tk5Ef2LGG1R0xUzxqqpcKHfpKs74gtkHQyvzuZcUmieGkNLYeX3migZKP5295iCG1bIr1KQ7OLj3MkmRFD-Mes8o6D2OCaTnuONecq7YAVqkVO1JFYCks8Ed59uGsowaZJXABT77wE0OKm6eOT3TFudvaiwt9RVOLVhM9Vc1kaRjgHUCZmEZSyqNEAIrthmwlpvM8dVs7Mky9Y-4BOg '
        $store.setToken(res.data)
        // if (data.data) {

        // $store.setToken(data.data)
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

export {}
