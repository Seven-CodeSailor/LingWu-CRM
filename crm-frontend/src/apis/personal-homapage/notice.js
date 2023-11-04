/*
 * @Author: pipazi 2283356040@qq.com
 * @Date: 2023-11-01 21:29:40
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-03 22:37:11
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\personal-homapage\notice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'

// 个人首页 —— 公告通知接口
/**
 * @description: 发布公告
 * @param {*} params  //请求参数:{content(内容), createUserId(创建人), status(查看状态), title(标题), ownerDeptId(接收部门id), ownerUserId(接收人id), ...,}
 * @param {*} success  //成功回调
 * @param {*} fail  //失败回调
 * @return {Promise}
 * {
      "code": 10000,
      "data": true,
      "message": "提示消息内容"
    }
 */
export const releaseNotice = async (params, success, fail) => {
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

/**
 * @description: 查看指定公告详情
 * @param {*} params  //请求参数: {id(id)}
 * @param {*} success
 * @param {*} fail
 * @return {Promise}
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
export const getNoticeDetails = async (params,success, fail) => {
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


/**
 * @description: 获取系统公告
 * @param {*} params  //请求参数:{content(公告内容), pageIndex(查询页码), pageSize(查询条数), title(公告标题), ...,}
 * @param {*} success
 * @param {*} fail
 * @return {Promise}
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
    export const getSystemNotice = async (params,success, fail) => {
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

/**
 * @description: 删除公告（可批量删除）
 * @param {Object} params  //请求参数: ids
 * @param {*} success
 * @param {*} fail
 * @return {Promise}
 * {
      "code": 10000,
      "data": true,
      "message": "提示消息内容"
    }
 */
export const deleteNotice = async (params) => {
  return await Request.requestJson(
    Request.POST,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
    {
      params
    }
  )
}

/**
 * @description: 标记已读公告（可批量标记）
 * @param {*} params  //请求参数:{content(内容), createUserId(创建人), status(查看状态), title(标题), ownerDeptId(接收部门id), ownerUserId(接收人id), ...,}
 * @param {*} success
 * @param {*} fail
 * @return {Promise}
 * {
      "code": 10000,
      "data": true,
      "message": "提示消息内容"
    }
 */
    export const markNoticeAsRead = async (params, success, fail) => {
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
