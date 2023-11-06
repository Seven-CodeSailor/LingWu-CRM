/*
 * @Author: BINGWU
 * @Date: 2023-10-26 20:52:05
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-06 18:13:57
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
        data.data.token =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkyOTYzODksImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.ryOHSBH9Lc6noZlmA6S-X_1ACHvcSACLpIwNr7aKOVIW1OJg7fqUKi3NQrln-gdEmp3i6k4l73Kxotl4hygzq-J2SCJr-h15QyqL_Z6c7wDd_QAqi4Jx6idg2mK5jNbB2ZTCoKq4b0k85wFbgk2sdKftjM9-z5Z3O0TWXnyka0-rFG9Jxaw28LGQ3OdrdrTMPfoR9B-GNd0pKj-rlJu6rrjv_mcDO0K1aJaHiV_aecwXiQTv07O8C8oY_VBZ1bq-ctENK2OF6RbDhwW3bcSC7KKbgoQUJ8VsxV-Y9_9VjCuwxfOuOJ8Oj-L6T63WUBaaTI2GgHf4-YPowBjg67Df6g'
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
