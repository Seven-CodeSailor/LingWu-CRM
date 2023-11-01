/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-31 16:01:04
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-01 11:06:54
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\fund\collectionPlan\index.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import Request from '@/apis/request'

const baseUrl = '/collectionplans'

const addCollectionPlan = (data, success, fail) => {
  Request.requestForm(Request.POST, baseUrl + '/add-collection', data)
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

const updateCollectionPlan = (data, success, fail) => {
  Request.requestForm(Request.PUT, baseUrl + '/update-pay-plan', data)
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

const updateConfirmCollectionPlan = (data, success, fail) => {
  Request.requestJson(Request.PUT, baseUrl + '/update-confirm-plan', data)
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
export { addCollectionPlan, updateCollectionPlan, updateConfirmCollectionPlan }
