/*
 * @Author: pipazi 2283356040@qq.com
 * @Date: 2023-11-01 21:29:40
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-05 22:05:56
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\personal-homapage\notice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'
const baseUrl = '/java3-personalhomepage'

// 发布公告
export const releaseNotice = async (params) => {
  await Request.requestForm(
    Request.POST,
    baseUrl + '/j3-notice-remind/add-notice',
    params
  )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

// 查看指定公告详情
export const getNoticeDetails = async (params) => {
  await Request.requestForm(
    Request.GET,
    baseUrl + '/j3-notice-remind/get-notice'
  )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * @description: 获取系统公告
 * @param {*} params  //请求参数:
 * @param {*} success
 * @param {*} fail
 * @return {*}
 * {
      "code": 10000,
      "data": {
        "content": "无内容",
        "createTime": "2020-01-01",
        "createUserId": 1,
        "id": 1,
        "ownerUserId": 1,
        "status": "未读",
        "title": "无标题"
      },
      "message": "提示消息内容"
    }
 */
export const getPagedict = async (params, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-Pagedict'
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
