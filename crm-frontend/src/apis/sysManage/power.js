/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-11-04 21:32:59
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-04 21:38:29
 * @FilePath: \zero-one-crmsys\crm-frontend\src\apis\sysManage\power.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import Request from '@/apis/request'

const addPower = (data) => {
  return Request.requestJson(
    Request.POST,
    '/systemmanagement/fly-sys-method/add-method',
    data
  )
}

const deletePower = (data) => {
  return Request.requestForm(
    Request.POST,
    '/systemmanagement/fly-sys-method/deletemethod',
    data
  )
}

const getPowerList = (pageParams, searchData) => {
  return Request.requestForm(
    Request.GET,
    '/systemmanagement/fly-sys-method/getMethodList',
    {
      ...pageParams,
      ...searchData
    }
  )
}

const updatePowerList = (data) => {
  return Request.requestJson(
    Request.PUT,
    '/systemmanagement/fly-sys-method/modify-method',
    data
  )
}

export { addPower, getPowerList, updatePowerList, deletePower }
