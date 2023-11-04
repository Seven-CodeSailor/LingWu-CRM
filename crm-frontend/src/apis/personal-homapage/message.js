/*
 * @Author: pipazi 2283356040@qq.com
 * @Date: 2023-11-03 12:56:03
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-03 23:21:06
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\personal-homapage\message.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Request from '@/apis/request.js'

// 个人首页——消息通知接口
/**
 * @description: 删除消息（单条）
 * @param {*} params  //请求参数: ids
 * @param success  //成功回调
 * @param fail  //失败回调
 * @return {Promise}
 * {
        "code": 10000,
        "data": true,
        "message": "提示消息内容"
    }
 */
export const deleteMessage = async (params) => {
    return await Request.requestJson(
      Request.DELETE,
      'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
      {
        params
      } 
    )
    .then((res) => {
        success(res)
      })
      .catch((err) => {
        fail(err)
      })
  }
  
/**
 * @description: 标记消息已读（批量操作）
 * @param {*} params //请求参数: ids
 * @return {*}
 * {
        "code": 10000,
        "data": true,
        "message": "提示消息内容"
    }
    */
export const markMessageAsRead= (params) => {
    return Request.requestJson(
      Request.POST,
      'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/add-dictclassify',
      params
    )
  }

/**
 * @description: 发布消息 
 * @param {*} params //请求参数: {msgTitle(消息主题), msgType(消息类型), ownerUserId(所属用户编号), remindTime(提醒时间), urlId(URL编号), urlType(URL类型) }
 * @return {*}
 * {
        "code": 10000,
        "data": true,
        "message": "提示消息内容"
    }
 */
export const releaseMessage= (params) => {
    return Request.requestJson(
      Request.POST,
      'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/add-dictclassify',
      params
    )
  }

/**
 * @description: 根据分页条件获取消息列表
 * @param {Object} params // 请求参数: {flag(消息是否被处理	), keyWord(关键字), msgType(消息类型), pageIndex(查询页码), pageSize(查询条数)}
 * @return {Promise}
 */
export const getMessageList = async (params) => {
    return await Request.requestJson(
      Request.GET,
      'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
      {
        params
      }
    )
  }

  /**
 * @description: 查看消息详情
 * @param {Object} params // 请求参数: {id}
 * @return {Promise}
 */
export const getMessageDetails = async (params) => {
    return await Request.requestJson(
      Request.GET,
      'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/dictmanage/get-dict',
      {
        params
      }
    )
  }