/*
 * @Author: pipazi 2283356040@qq.com
 * @Date: 2023-11-03 12:55:47
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-03 20:43:27
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\personal-homapage\infomation.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'

/**
 * @description: 编辑资料
 * @param {*} params  // 请求参数名：{ 地址, 电子邮箱, 性别, 身份, 简介, 固定电话, 姓名, qq, 电话号码, 邮政编码 }
 * @param {*} success
 * @param {*} fail
 * @return {*}
 * {
	  "code": 10000,
	  "data": true,
	  "message": "提示消息内容"
    }
 */

export const postPersonalInformation = async (params, success, fail) => {
    await Request.requestJson(
      Request.POST,
      'https://mock.apifox.cn/m1/3500676-0-default/getdata',
      {}
    )
      .then((response) => {
        success(response)
      })
      .catch((error) => {
        fail(error)
      })
}


  