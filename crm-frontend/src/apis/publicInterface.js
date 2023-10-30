// import Request from '../request'
import useSelect from '@/stores/customer/select.js'

const select = useSelect()

/**
 * 获取客户名称下拉列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getCustomerName = (param, success = () => {}, fail = () => {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(param)
    }, 0)
  })
    .then(() => {
      let name = [
        {
          value: 'Option1',
          label: '成都零起飞科技'
        },
        {
          value: 'Option2',
          label: '01'
        },
        {
          value: 'Option3',
          label: 'asd'
        }
      ]
      if (name) {
        select.setName(name)
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
 * 获取联系人名称列表
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const queryContactName = (
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
      let name = [
        {
          value: 'Option1',
          label: '成都零起飞科技'
        },
        {
          value: 'Option2',
          label: '01'
        },
        {
          value: 'Option3',
          label: 'asd'
        }
      ]
      if (name) {
        select.setName(name)
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}
