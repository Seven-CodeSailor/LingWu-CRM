// import Request from '../request'
import useSelect from '@/stores/customer/select.js'
import useMyClient from '@/stores/customer/myClient.js'
import useServiceRecord from '@/stores/customer/servicerecord.js'

const select = useSelect()
const myclient = useMyClient()
const serviceRecord = useServiceRecord()

/**
 * 获取客户联系人下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerConcats = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let contacts = [
        {
          value: 'Option1',
          label: 'asdas'
        },
        {
          value: 'Option2',
          label: '张三'
        },
        {
          value: 'Option3',
          label: '李四'
        }
      ]
      if (contacts) {
        select.setContacts(contacts)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户归属下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerBelong = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let belong = [
        {
          value: 'Option1',
          label: '网络'
        },
        {
          value: 'Option2',
          label: '客户介绍'
        },
        {
          value: 'Option3',
          label: '主动开发'
        }
      ]
      if (belong) {
        select.setBelong(belong)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户等级下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerLevel = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let level = [
        {
          value: 'Option1',
          label: '普通客户'
        },
        {
          value: 'Option2',
          label: '一般客户'
        },
        {
          value: 'Option3',
          label: '重点客户'
        }
      ]
      if (level) {
        select.setLevel(level)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户行业列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerIndusty = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let industy = [
        {
          value: 'Option1',
          label: '互联网行业'
        },
        {
          value: 'Option2',
          label: '服务行业'
        },
        {
          value: 'Option3',
          label: '原材料行业'
        }
      ]
      if (industy) {
        select.setIndusty(industy)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户销售机会下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerOpportnity = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let opportnity = [
        {
          value: 'Option1',
          label: '普通机会'
        },
        {
          value: 'Option2',
          label: '一般机会'
        },
        {
          value: 'Option3',
          label: '重点机会'
        }
      ]
      if (opportnity) {
        select.setOpportnity(opportnity)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取当前阶段下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerStage = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let stage = [
        {
          value: 'Option1',
          label: '初期沟通'
        },
        {
          value: 'Option2',
          label: '立项评估'
        },
        {
          value: 'Option3',
          label: '需求分析'
        },
        {
          value: 'Option4',
          label: '方案制定'
        },
        {
          value: 'Option5',
          label: '商务谈判'
        },
        {
          value: 'Option6',
          label: '合同签订'
        },
        {
          value: 'Option7',
          label: '失单'
        }
      ]
      if (stage) {
        select.setStage(stage)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取沟通方式下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerWay = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let way = [
        {
          value: 'Option1',
          label: '电话'
        },
        {
          value: 'Option2',
          label: '上门'
        },
        {
          value: 'Option3',
          label: '邮寄'
        },
        {
          value: 'Option4',
          label: '网络'
        }
      ]
      if (way) {
        select.setWay(way)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取服务类型下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerServiceType = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let serviceType = [
        {
          value: 'Option1',
          label: '投诉'
        },
        {
          value: 'Option2',
          label: '培训'
        },
        {
          value: 'Option3',
          label: '升级'
        },
        {
          value: 'Option4',
          label: '维护'
        }
      ]
      if (serviceType) {
        select.setServiceType(serviceType)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取服务方式下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerServiceWay = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let serviceWay = [
        {
          value: 'Option1',
          label: '电话'
        },
        {
          value: 'Option2',
          label: 'QQ'
        },
        {
          value: 'Option3',
          label: '现场'
        },
        {
          value: 'Option4',
          label: '网络'
        }
      ]
      if (serviceWay) {
        select.setServiceWay(serviceWay)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取我方代表下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerRepresent = (
  param,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let represent = [
        {
          value: 'Option1',
          label: 'test'
        },
        {
          value: 'Option2',
          label: '管理员'
        },
        {
          value: 'Option3',
          label: 'cw'
        }
      ]
      if (represent) {
        select.setRepresent(represent)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomer = (
  pageIndex,
  pageSize,
  coonTime,
  nextTime,
  name,
  mobile,
  tel,
  address,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        pageIndex,
        pageSize,
        coonTime,
        nextTime,
        name,
        mobile,
        tel,
        address
      )
    }, 0)
  })
    .then(() => {
      let data = [
        {
          id: 1,
          name: '成都零起飞科技',
          createTime: '2023-02-11 14:50:14', //创建时间
          represent: '01', //客户代表
          belong: '中国', //客户来源
          level: '重点客户', //客户等级
          industry: '互联网企业', //客户行业,
          tel: '112', //联系电话
          mobile: '145', //联系手机,
          address: '联系地址', //联系地址
          intro: '客户介绍', //客户介绍
          demand: '', //客户需求
          lastContact: '2023-09-20 18:35:14', //上次联系
          content: '干饭干饭', //联系内容
          nextContact: '2023-09-18 11:55:14' //下次联系
        },
        {
          id: 2,
          name: '成都零起飞科技',
          createTime: '2023-02-11 14:50:14', //创建时间
          representative: '01', //客户代表
          belong: '中国', //客户来源
          level: '重点客户', //客户等级
          industry: '互联网企业', //客户行业,
          tel: '112', //联系电话
          mobile: '145', //联系手机,
          address: '联系地址', //联系地址
          intro: '客户介绍', //客户介绍
          demand: '', //客户需求
          lastContact: '2023-09-20 18:35:14', //上次联系
          content: '干饭干饭', //联系内容
          nextContact: '2023-09-18 11:55:14' //下次联系
        },
        {
          id: 3,
          name: '成都零起飞科技',
          createTime: '2023-02-11 14:50:14', //创建时间
          representative: '01', //客户代表
          belong: '中国', //客户来源
          level: '重点客户', //客户等级
          industry: '互联网企业', //客户行业,
          tel: '112', //联系电话
          mobile: '145', //联系手机,
          address: '联系地址', //联系地址
          intro: '客户介绍', //客户介绍
          demand: '', //客户需求
          lastContact: '2023-09-20 18:35:14', //上次联系
          content: '干饭干饭', //联系内容
          nextContact: '2023-09-18 11:55:14' //下次联系
        },
        {
          id: 4,
          name: '成都零起飞科技',
          createTime: '2023-02-11 14:50:14', //创建时间
          representative: '01', //客户代表
          belong: '中国', //客户来源
          level: '重点客户', //客户等级
          industry: '互联网企业', //客户行业,
          tel: '112', //联系电话
          mobile: '145', //联系手机,
          address: '联系地址', //联系地址
          intro: '客户介绍', //客户介绍
          demand: '', //客户需求
          lastContact: '2023-09-20 18:35:14', //上次联系
          content: '干饭干饭', //联系内容
          nextContact: '2023-09-18 11:55:14' //下次联系
        }
      ]
      if (data) {
        myclient.gettableData(data)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户详细信息
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryCustomerDetails = (
  id,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id)
    }, 0)
  })
    .then((data) => {
      success(data)
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取客户基础信息表单数据项
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getBaseCustomerInfo = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        myclient.gettableData(data)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 添加新的客户
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const postCustomer = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      myclient.tableData.unshift(param)
      success()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 修改客户基础信息
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const putCustomer = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        resolve(param)
      }, 0)
    }, 0)
  })
    .then(() => {
      myclient.tableData.unshift(param)
      success()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 删除客户，可批量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const deleteCustomer = (
  param = [],
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      // myclient.tableData.value = myclient.tableData.filters((item) => {
      //   return !param.includes(item.id)
      // })
      success()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 批量投入公海
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const invesHightSea = (list, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ list })
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 导出客户
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const exportCustomer = (
  createId,
  ownerID,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ createId, ownerID })
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 上传导入文件
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const uploadCustomerFile = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 导入客户
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const importCustomer = (str, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取联系人名称
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryContactName = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取联系人列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryContactList = (
  currentPage,
  pageSize,
  customerName,
  linkName,
  address,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pageIndex: currentPage,
        pageSize,
        key: linkName,
        customer_name: customerName,
        address
      })
    }, 0)
  })
    .then(() => {
      let data = [
        {
          linkmanId: 1, //联系人ID
          cuntomerId: '123', //客户ID
          customerName: '456', //客户名称
          linkName: '成都零起飞科技', //联系人名称
          gender: '男', //联系人性别 1=男，0=女
          position: '联系人职位', //联系人职位
          tel: '联系人座机', //联系人座机
          mobile: '联系人手机', //联系人手机
          qicq: '联系人QQ', //联系人QQ
          email: '联系人邮箱', //联系人邮箱
          zipcode: '联系人邮政编码', //联系人邮政编码
          address: '联系人地址', //联系人地址
          intro: '联系人简介', //联系人简介
          create_user_id: 0, //联系人创建人ID
          create_time: '联系人创建时间' // 联系人创建时间
        },
        {
          linkmanId: 2, //联系人ID
          cuntomerId: '123', //客户ID
          customerName: '456', //客户名称
          linkName: '成都零起飞科技', //联系人名称
          gender: '男', //联系人性别 1=男，0=女
          position: '联系人职位', //联系人职位
          tel: '联系人座机', //联系人座机
          mobile: '联系人手机', //联系人手机
          qicq: '联系人QQ', //联系人QQ
          email: '联系人邮箱', //联系人邮箱
          zipcode: '联系人邮政编码', //联系人邮政编码
          address: '联系人地址', //联系人地址
          intro: '联系人简介', //联系人简介
          create_user_id: 0, //联系人创建人ID
          create_time: '联系人创建时间' // 联系人创建时间
        },
        {
          linkmanId: 3, //联系人ID
          cuntomerId: '123', //客户ID
          customerName: '456', //客户名称
          linkName: '成都零起飞科技', //联系人名称
          gender: '男', //联系人性别 1=男，0=女
          position: '联系人职位', //联系人职位
          tel: '联系人座机', //联系人座机
          mobile: '联系人手机', //联系人手机
          qicq: '联系人QQ', //联系人QQ
          email: '联系人邮箱', //联系人邮箱
          zipcode: '联系人邮政编码', //联系人邮政编码
          address: '联系人地址', //联系人地址
          intro: '联系人简介', //联系人简介
          create_user_id: 0, //联系人创建人ID
          create_time: '联系人创建时间' // 联系人创建时间
        }
      ]
      if (data) {
        myclient.getLinksTableData(data)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取联系人表单数据项
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getContactField = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 添加联系人
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const addNewContact = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 修改联系人
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const modifyContact = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 删除联系人
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const removeContact = (id, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 导出联系人
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryContactFile = (
  ownerId,
  createId,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ownerId, createId)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 发送短信
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const sendsms = (
  customerId,
  ctype,
  message,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customerId, ctype, message)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 发送邮件
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const sendEmail = (
  customerId,
  ctype,
  message,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customerId, ctype, message)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 获取服务记录列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryServiceNote = (
  currentPage,
  pageSize,
  customerName,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pageIndex: currentPage,
        pageSize,
        customer_name: customerName
      })
    }, 0)
  })
    .then(() => {
      let data = [
        {
          customeId: '1', // 客户id
          linkmanId: '12', //联系人id
          services: '45', // 服务类型
          servicesmodel: '546', //服务方式
          price: '78', // 价格
          status: '123', //服务记录状态 1=无需处理，2未处理，3=处理中，4处理完成
          serviceTime: '456', // 服务日期
          tlen: '78', //服务时长
          content: '53', //服务内容
          intro: '123456', //备注
          customerName: '123', //客户姓名
          linkmanName: '456' //联系人姓名
        },
        {
          customeId: '2', // 客户id
          linkmanId: '12', //联系人id
          services: '45', // 服务类型
          servicesmodel: '546', //服务方式
          price: '78', // 价格
          status: '123', //服务记录状态 1=无需处理，2未处理，3=处理中，4处理完成
          serviceTime: '456', // 服务日期
          tlen: '78', //服务时长
          content: '53', //服务内容
          intro: '123456', //备注
          customerName: '123', //客户姓名
          linkmanName: '456' //联系人姓名
        },
        {
          customeId: '3', // 客户id
          linkmanId: '12', //联系人id
          services: '45', // 服务类型
          servicesmodel: '546', //服务方式
          price: '78', // 价格
          status: '123', //服务记录状态 1=无需处理，2未处理，3=处理中，4处理完成
          serviceTime: '456', // 服务日期
          tlen: '78', //服务时长
          content: '53', //服务内容
          intro: '123456', //备注
          customerName: '123', //客户姓名
          linkmanName: '456' //联系人姓名
        }
      ]
      if (data) {
        serviceRecord.setTableData(data)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 添加服务记录
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const addService = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ param })
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 修改服务记录
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const modifyService = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ param })
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 删除服务记录，批量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const removeService = (list, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 导出服务记录
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const exportService = (id, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 发送短信
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const sendsmsService = (
  customerId,
  ctype,
  message,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customerId, ctype, message)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}

/**
 * 发送邮件
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const sendEmailService = (
  customerId,
  ctype,
  message,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customerId, ctype, message)
    }, 0)
  })
    .then(() => {
      let data = []
      if (data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}
