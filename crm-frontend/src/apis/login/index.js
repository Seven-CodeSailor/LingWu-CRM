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
          'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpdGllcyI6WyJTVVBFUl9BRE1JTiJdLCJleHAiOjE2OTkzOTI0MzgsImlkIjoiMSIsInVzZXJfbmFtZSI6InJvdW1pb3UifQ.VmpFhObsxaAxsyICVIXtl1Ha3gmfj2gKDdeZdmMYltfFDt76QVWCUysB2PcouSOkfo_g9gKv23g8AC6DHOyTm84MxWO45a3rXZAXoDJbWt9jVd3s9dzUmIP02EiaJVgjAmTXwiCkYlfWF0b1-mkiQqNmODrrQkhuSEEcVqotlbB1UDFXEAyPBBagzIjoC2qqYTOqwrtyollw2CuWU8uAvsuhJU1NXuq1hvsPr1glJgytAtv00Va_KUcKW_bBoWR_IRpk5HrFO_kWddOWJMTLn1j8MGTDOHE5aZRHJLeEwf9Q1A_XXu44AagDZWxYh-gdcv3DTjfF-bQbwYr5D72GnQ'
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
