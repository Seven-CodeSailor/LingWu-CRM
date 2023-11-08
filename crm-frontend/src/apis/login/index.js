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
        data.data.token =
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTk0NzExNzQsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.fnN07fxG9y29XvFHwwI_nZ0LEgJW-ay9G8antBtAUPT9Jq3z35ku6y_LuBb-ycP0lw9u5lmCT9AjimyGKua9wXNgRSj499CBnz5YoowcHS4V0fbPwTcR1tesS6Cta1wlC3fW_fiLAml-2SKQVoBTCRnHYnXKzKZL_ZxRkJ-Ww57X6IaA-pXTzMK6w_WJtvq6tB9FMzzQrYFqimxAFxCuLVopAefEApkaL3pnlPuD5mjDCC_NvaBneTQj1GO08ZFgcBcyAgQK-UkkOM6vn8hXFXYgytFoqPLHqCKwDfsoqxjrQlFL6hfGBXsfONwIiMxEeLxPr12anaEuZdOu-4uUBg'
        // 冰雾测试接口的token
        // data.data.token =
        //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkyMDQyMzcsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.inkPd2E0H2DZZrCuhErMp4qXaSrHfaUfX6XN4BGe-1Hfajegeb0RiltDLjaGmDI1WUetI7iy6NaES6PTqquWgNMqJiECJl3iq8ouOS6BNF7zwZ-dtd7hh7iVtFwPUY6opIJEaLqly-Yy4QWyFcWBXg0-cbuIzVSmdFkVFY2jm2Gm2gKzVRxW3Y5G2ioS61uokszlwRMXuGonVb6lZ-Epdce1AH7sBySMUAPv0lqXLfj6H4HVjJ0ZbQNacfJTgjer-H68lSKzPmNmSfyEseXVTUnXtXeqossijuKHEtzfhgfDlQPJMr-yGxzAndsyIiTmJQCUOs3uyMY32oYCGR6KaQ'
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
