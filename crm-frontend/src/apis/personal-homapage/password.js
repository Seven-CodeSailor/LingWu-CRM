/*
 * @Author: pipazi 2283356040@qq.com
 * @Date: 2023-11-03 12:55:52
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-05 22:09:06
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\personal-homapage\password.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'

/**
 * @description: 个人首页——修改密码
 * @param {*} params //请求参数:{newPassword(新密码), newPassword(旧密码)}
 * @param {*} success 成功回调
 * @param {*} fail 失败回调
 * @return {*}
 * {
	"code": 10000,
	"data": true,
	"message": "提示消息内容"
    }
 */
export const getUserTableList = async (params, success, fail) => {
  await Request.requestJson(
    Request.POST,
    'http://101.34.252.80:10110/orgstructure/user/user/query-all-by-deptid-or-name',
    params
  )
    .then((response) => {
      // 请求返回的数据就是response,在成功回调函数可以拿到
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
