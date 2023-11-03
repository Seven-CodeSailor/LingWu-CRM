// import Request from '../request'

import useSupplierLinkman from '@/stores/supplier/linkman/linkman'

const supplierLinkman = useSupplierLinkman()

/**
 *
 * @param {*} pageIndex 查询页码
 * @param {*} pageSize 查询条数
 * @param {*} keywords 查询关键字
 * @param {*} supplierName 供应商名称
 * @param {*} address 通信地址
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getSupplier = (
  pageIndex,
  pageSize,
  keywords,
  supplierName,
  address,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ pageIndex, pageSize, keywords, supplierName, address })
    }, 0)
  })
    .then(() => {
      supplierLinkman.setTableData([
        {
          supplierId: '1', // 供应商ID
          supplierName: '供应商名称', //供应商名称
          gender: '男', //性别
          position: 'P1', //职位
          tel: '120', //电话号码
          mobile: '110', //座机
          qq: '12345', // QQ      fax: '', // 传真
          email: '@.com', //邮箱
          zipcode: '36584', //邮政编码
          address: '123', //联系地址
          intro: '无', //介绍
          createUserId: '13', //创建用户ID
          createTime: '11-3', //创建时间
          linkmanId: '1', //供应商联系人ID
          name: '供应商联系人' // 供应商联系人名称
        },
        {
          supplierId: '2', // 供应商ID
          supplierName: '供应商名称', //供应商名称
          gender: '男', //性别
          position: 'P1', //职位
          tel: '120', //电话号码
          mobile: '110', //座机
          qq: '12345', // QQ      fax: '', // 传真
          email: '@.com', //邮箱
          zipcode: '36584', //邮政编码
          address: '123', //联系地址
          intro: '无', //介绍
          createUserId: '13', //创建用户ID
          createTime: '11-3', //创建时间
          linkmanId: '1', //供应商联系人ID
          name: '供应商联系人' // 供应商联系人名称
        },
        {
          supplierId: '3', // 供应商ID
          supplierName: '供应商名称', //供应商名称
          gender: '男', //性别
          position: 'P1', //职位
          tel: '120', //电话号码
          mobile: '110', //座机
          qq: '12345', // QQ      fax: '', // 传真
          email: '@.com', //邮箱
          zipcode: '36584', //邮政编码
          address: '123', //联系地址
          intro: '无', //介绍
          createUserId: '13', //创建用户ID
          createTime: '11-3', //创建时间
          linkmanId: '1', //供应商联系人ID
          name: '供应商联系人' // 供应商联系人名称
        }
      ])
      success()
    })
    .catch(() => {
      fail()
    })
}

/**
 * 添加供应商联系人
 * @param {*} params 供应商联系人对象
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const addlinkman = (params, success = () => {}, fail = () => {}) => {
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
 * 修改供应商联系人
 * @param {*} params 供应商联系人对象,含supplierId
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const modifylinkman = (params, success = () => {}, fail = () => {}) => {
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
 * 删除供应商联系人，可批量
 * @param {*} params 供应商联系人对象,含supplierId
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const removelinkman = (
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

/**
 * 批量发短信
 * @param {*} supplierList 收件人列表
 * @param {*} supMessage 短信内容
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const sendMessage = (
  supplierList = [],
  supMessage,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(supplierList, supMessage)
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
 * 批量发短信
 * @param {*} supplierList 收件人列表
 * @param {*} emailMsg 邮件内容
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const sendEmail = (
  supplierList = [],
  emailMsg,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(supplierList, emailMsg)
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
 * 导出供应商联系人
 * @param {*} params 供应商联系人对象,含supplierId
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 */
export const exportlinkman = (
  keywords,
  supplierName,
  address,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(keywords, supplierName, address)
    }, 0)
  })
    .then(() => {
      success()
    })
    .catch(() => {
      fail()
    })
}
