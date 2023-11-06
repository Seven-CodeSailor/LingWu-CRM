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
        data.data.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkyNzA4NjUsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.Q-gPAGY0VsSH-tNKhAt3v2BcnxZHBZte5iFyh1BC7YJft9jCwS-OaY-EZcjmy1hPtvs4m5onFyh3tflB7J0IDP-p_hcKkbUSfFyzrAr3YRYJthKym-tNvb7IBmd2dSr6WoOV6gi353iD-qXNAVLgCGrjzmbqb1W27EZcqOp3Jd4KK1sO7XSgs1Jln6Muh_SyClLnK5FfhKnHM7mnR81f27ko3kNN_RNL1pTP_Fl1d3zohJNSEGh3rEkSH4icNbCafaRprXx-ixlN4demsx26SY5EKRUDgBQOerA8ic-MnCxXCFtx4RVZXB4skolwQJE2L4N7koICVKivKL1xVWIw-A'
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
