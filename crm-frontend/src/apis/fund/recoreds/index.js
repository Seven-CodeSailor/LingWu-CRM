// import Request from '@/apis/request'
import useRecords from '@/stores/fund/records/records'

const records = useRecords()

// 获取流水记录列表
export const queryFlowredords = (
  pageINdex,
  pageSize,
  bankId,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ pageINdex, pageSize, bankId })
    }, 0)
  })
    .then((response) => {
      records.setTableData([
        {
          bankId: '1', //银行账号
          income: 100, //收入
          expenditrue: 100, //支出
          surplus: 100, //余额
          type: '2', //支出类型
          connectId: '215', //关联单号
          createUser: 'aaabu', //创建人
          createTime: '11-03' // 创建时间
        },
        {
          bankId: '2', //银行账号
          income: 100, //收入
          expenditrue: 100, //支出
          surplus: 100, //余额
          type: '2', //支出类型
          connectId: '215', //关联单号
          createUser: 'aaabu', //创建人
          createTime: '11-03' // 创建时间
        },
        {
          bankId: '3', //银行账号
          income: 100, //收入
          expenditrue: 100, //支出
          surplus: 100, //余额
          type: '2', //支出类型
          connectId: '215', //关联单号
          createUser: 'aaabu', //创建人
          createTime: '11-03' // 创建时间
        }
      ])
      records.setTotalIncome(300)
      records.setTotalExpenditure(300)
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}

// 导出流水记录
export const exportFlowrecords = (
  list = [],
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list)
    }, 0)
  })
    .then((response) => {
      success(response)
    })
    .catch((error) => {
      fail(error)
    })
}
