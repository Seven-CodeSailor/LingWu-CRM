/*
 * @Author: pipazi 2283356040@qq.com
 * @Date: 2023-11-01 21:29:40
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-06 19:42:04
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\personal-homapage\notice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'
const baseUrl = '/java3-personal-homepage'

// 发布公告
export const addNotice = async (params) => {
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
export const getNotice = async (params) => {
  await Request.requestForm(
    Request.GET,
    baseUrl + '/j3-notice-remind/get-notice',
    params
  )
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

// 获取系统公告
// /**
//  * 请求参数：
//  * @param {*} params {
//  *  content: 公告内容，
//  *  pageIndex： 查询页码
//  *  pageSize： 查询条数
//  *  title： 公告标题
//  * }
//  * @returns 
//  */

export const queryNotion = async (params) => {
  return await Request.requestForm(
    Request.GET,
    baseUrl  + '/j3-notice-remind/query-notion',
    params
  )
  .then((res) => {
    success('res',res)
  })
  .catch((err) => {
    console.log('err', err)
  })
}

// 删除公告（可批量删除)
export const removeNotice = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl  + '/j3-notice-remind/remove-notice',
    params
  )
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}


// 标记已读公告(可批量标记)
export const updateNotice = async (params) => {
  return await Request.requestJson(
    Request.POST,
    baseUrl  + '/j3-notice-remind/update-notice',
    params
  )
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}
