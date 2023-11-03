// import Request from '../request'

import useSupplierList from '@/stores/supplier/list/list'

const supplierList = useSupplierList()

/**
 *
 * @param {*} pageIndex 查询页码
 * @param {*} pageSize 查询条数
 * @param {*} name 查询关键字
 * @param {*} telephone 座机号码
 * @param {*} mombile 手机号码
 * @param {*} address 联系地址
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getSupplier = (
  pageIndex,
  pageSize,
  name,
  telephone,
  mombile,
  address,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ pageIndex, pageSize, name, telephone, mombile, address })
    }, 0)
  })
    .then(() => {
      supplierList.setTableData([
        {
          supplierId: '1', // 供应商ID
          supplierName: '供应商', //供应商名称
          ecoType: '经济类型', //经济类型
          indType: '行业类型', //行业类型
          contact: '联系人', //联系人
          telephone: '110', //电话号码
          fax: '10', // 传真
          email: '@.com', //邮箱
          address: '地球', //联系地址
          intro: '无' //介绍
        },
        {
          supplierId: '2', // 供应商ID
          supplierName: '供应商', //供应商名称
          ecoType: '经济类型', //经济类型
          indType: '行业类型', //行业类型
          contact: '联系人', //联系人
          telephone: '110', //电话号码
          fax: '10', // 传真
          email: '@.com', //邮箱
          address: '地球', //联系地址
          intro: '无' //介绍
        },
        {
          supplierId: '3', // 供应商ID
          supplierName: '供应商', //供应商名称
          ecoType: '经济类型', //经济类型
          indType: '行业类型', //行业类型
          contact: '联系人', //联系人
          telephone: '110', //电话号码
          fax: '10', // 传真
          email: '@.com', //邮箱
          address: '地球', //联系地址
          intro: '无' //介绍
        }
      ])
      success()
    })
    .catch(() => {
      fail()
    })
}

/**
 * 添加供应商
 * @param {*} params 供应商对象
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const addSupplier = (params, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params)
    }, 0)
  })
    .then(() => {
      success()
    })
    .catch(() => {
      fail()
    })
}

/**
 * 修改供应商
 * @param {*} params 供应商对象,含supplierId
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const modifySupplier = (params, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params)
    }, 0)
  })
    .then(() => {
      success()
    })
    .catch(() => {
      fail()
    })
}

/**
 * 删除供应商，可批量
 * @param {*} params 供应商对象,含supplierId
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const removeSupplier = (
  list = [],
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 0)
  })
    .then(() => {
      success()
    })
    .catch(() => {
      fail()
    })
}
