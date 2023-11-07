/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-11-05 21:59:04
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-07 11:47:15
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\fund\collectionPlan\index.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import Request from '@/apis/request'

const getCollectionList = (pageParams, searchParams = {}) => {
  return Request.requestForm(
    Request.GET,
    '/collection-man/collectionplans/get-collectionplans',
    {
      ...pageParams,
      ...searchParams
    }
  )
}

const updateCollectionPlan = (data) => {
  return Request.requestJson(
    Request.PUT,
    '/collection-man/update-pay-plan',
    data
  )
}
export { getCollectionList, updateCollectionPlan }
