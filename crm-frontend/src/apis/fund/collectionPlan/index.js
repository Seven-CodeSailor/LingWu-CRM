/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-31 16:01:04
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-02 13:48:59
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\fund\collectionPlan\index.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import Request from '@/apis/request'

//获取回款列表
const getCollectionPlanList = (pageParams) => {
  return Request.requestJson(
    Request.GET,
    // '/collectionplans/get-collectionplans',
    'https://www.fastmock.site/mock/8e32bb7d22d2160aa723642e11594457/api/collectionplans/get-collectionplans',
    {
      ...pageParams
    }
  )
}
//添加回款计划
const addCollectionPlan = (data) => {
  return Request.requestJson(
    Request.POST,
    '/collectionplans/add-collection',
    data
  )
}

//修改回款计划
const updateCollectionPlan = (data) => {
  return Request.requestJson(
    Request.PUT,
    '/collectionplans/update-pay-plan',
    data
  )
}

//确认回款计划
const updateConfirmCollectionPlan = (data) => {
  return Request.requestJson(
    Request.POST,
    '/collection-plan/update-confirm-plan',
    data
  )
}

//删除回款计划
const deleteCollectionPlan = (id) => {
  return Request.requestJson(Request.DELETE, '/payback-manage/del-payplan', {
    listid: id
  })
}

export {
  getCollectionPlanList,
  addCollectionPlan,
  updateCollectionPlan,
  updateConfirmCollectionPlan,
  deleteCollectionPlan
}
