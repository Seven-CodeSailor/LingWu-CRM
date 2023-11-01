// import Request from '../request'
import useMessageInfo from '@/stores/system-page/messageInfo.js'

const messageInfo = useMessageInfo()

/**
 * 获取消息通知
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryMessageNotices = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = [
        {
          id: '1', //消息id
          msgTitle: '消息标题1', //消息标题
          message: '消息内容1', //消息内容
          msgType: '消息类型', //消息类型
          urlId: '/dashboard', //跳转链接
          urlType: '1', //链接类型
          remindTime: '10-29', // 提醒时间
          flag: -1 // 消息状态，是否已读
        },
        {
          id: '2', //消息id
          msgTitle: '消息标题2', //消息标题
          message: '消息内容2', //消息内容
          msgType: '消息类型', //消息类型
          urlId: '/dashboard', //跳转链接
          urlType: '1', //链接类型
          remindTime: '10-29', // 提醒时间
          flag: -1 // 消息状态，是否已读
        },
        {
          id: '3', //消息id
          msgTitle: '消息标题3', //消息标题
          message: '消息内容3', //消息内容
          msgType: '消息类型', //消息类型
          urlId: '/dashboard', //跳转链接
          urlType: '1', //链接类型
          remindTime: '10-29', // 提醒时间
          flag: -1 // 消息状态，是否已读
        }
      ]
      if (data) {
        messageInfo.setMessageInfo(data)
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
 * 标记为已读
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const markAsRead = (
  id,
  messageType,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      if (typeof id !== 'undefined') {
        console.log(id)
        messageInfo.markAsRead(id)
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
 * 查询公告通知提醒列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryAnnouncementNotices = (
  success = () => {},
  fail = () => {}
) => {
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
 * 添加消息通知
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
let i = 3

export const addMessageNotices = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {
        id: ++i, //消息id
        msgTitle: `消息标题` + i, //消息标题
        message: `消息内容` + i, //消息内容
        msgType: '消息类型', //消息类型
        urlId: '/dashboard', //跳转链接
        urlType: '1', //链接类型
        remindTime: '10-29', // 提醒时间
        flag: -1 // 消息状态，是否已读
      }
      if (data) {
        messageInfo.messageInfo = [...messageInfo.messageInfo, data]
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
 * 根据商机预计销售额统计商机数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countBusinessMoney = (
  firstData,
  secondData,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 统计商机数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countBusinessNumber = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 根据商机销售状态分类统计商机数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countBusinessSalestage = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 根据商机预计成功率统计商机数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countBusinessSuccessrate = (
  firstData,
  secondData,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 根据客户等级统计数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countCustomerGrade = (
  firstData,
  secondData,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 根据客户行业统计数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countCustomerIndustry = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 统计客户数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countCustomerNumber = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
 * 根据客户来源统计数量
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */

export const countCustomerSource = (success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 0)
  })
    .then(() => {
      let data = {}
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
