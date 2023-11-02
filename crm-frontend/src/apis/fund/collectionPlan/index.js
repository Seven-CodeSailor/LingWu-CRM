/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-31 16:01:04
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-02 11:22:09
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\fund\collectionPlan\index.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import Request from '@/apis/request'

const baseUrl = ''

const getCollectionPlanList = (pageParams) => {
  return Request.requestJson(
    Request.GET,
    'https://www.fastmock.site/mock/8e32bb7d22d2160aa723642e11594457/api/collectionplans/get-collectionplans',
    {
      ...pageParams
    },
    null
  )
}
//添加回款计划
const addCollectionPlan = (data, success, fail) => {
  Request.requestJson(
    Request.POST,
    baseUrl + '/collectionplans/add-collection',
    data
  )
    .then((data) => {
      if (data.data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      console.warn(err)
      fail()
    })
}

//修改回款计划
const updateCollectionPlan = (data, success, fail) => {
  Request.requestForm(
    Request.PUT,
    baseUrl + '/collectionplans/update-pay-plan',
    data
  )
    .then((data) => {
      if (data.data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      console.warn(err)
      fail()
    })
}

//确认回款计划
const updateConfirmCollectionPlan = (data, success, fail) => {
  Request.requestJson(
    Request.POST,
    baseUrl + '/collection-plan/update-confirm-plan',
    data
  )
    .then((data) => {
      if (data.data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      console.warn(err)
      fail()
    })
}

export {
  getCollectionPlanList,
  addCollectionPlan,
  updateCollectionPlan,
  updateConfirmCollectionPlan
}
