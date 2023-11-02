/*
 * @Author: BINGWU HuJiaCheng2003@163.com
 * @Date: 2023-10-28 22:16:05
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-10-31 15:25:58
 * @FilePath: \crm-frontend\src\apis\publicInterface.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Request from './request'
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

/**
 * @description: 获取字典分类下拉列表
 * @param {*} params // pageSize pageIndex name(非必选)
 * @param {*} success
 * @param {*} fail
 * @return {*}
 */
export const getDictclassifylist = async (params, success, fail) => {
  await Request.requestJson(
    Request.GET,
    'https://mockapi.eolink.com/KnVGhupeb89500c132462100d3745b0046ecd1264eeb224/get-dictclassifylist',
    {
      params
    }
  )
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
// 导入 资金管理/资金注入抽取 仓库
import useFundInjectionStore from '@/stores/fundManagement/fundInjection.js'
const fundInjection = useFundInjectionStore()
/**
 * 获取银行账户列表数据(用于输入表单下拉列表)
 * @param {*} success 成功的回调
 * @param {*} fail 失败的回调
 * @returns
 */
export const getBankAccountList = (
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
      let bankSelectList = [
        {
          value: 'Option1',
          label: '所有回款账户'
        },
        {
          value: 'Option2',
          label: '工商银行982731237861283'
        },
        {
          value: 'Option3',
          label: '农业银行982731237861283'
        }
      ]
      if (bankSelectList) {
        // fundInjection是仓库名,把这个数据存到仓库
        fundInjection.setBankSelectList(bankSelectList)
        success()
        return true
      }
      fail()
    })
    .catch((err) => {
      fail(err)
    })
}
