// import Request from '../request'
import useDashBoard from '@/stores/dashBoard/dashBoard.js'

const dashBoard = useDashBoard()

export const getOpportunityChartsData = (
  time = 1,
  success = () => {},
  fail = () => {}
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time)
    }, 0)
  })
    .then(() => {
      let data = {
        title: '客户数据统计',
        x: ['我的客户', '下属客户', '公海客户']
      }
      switch (time) {
        case 1:
          data.contractsNumber = [3, 2, 1]
          data.amount = [0.45, 0.48, 0.79]
          break
        case 2:
          data.contractsNumber = [6, 3, 3]
          data.amount = [1.75, 1.03, 0.89]
          break
        case 7:
          data.contractsNumber = [16, 9, 7]
          data.amount = [5.78, 9.78, 6.54]
          break
        case 30:
          data.contractsNumber = [34, 25, 9]
          data.amount = [30.79, 20.45, 10.56]
          break
        case 90:
          data.contractsNumber = [89, 35, 54]
          data.amount = [146.78, 64.75, 95.98]
          break
        case 365:
          data.contractsNumber = [240, 110, 130]
          data.amount = [357.154, 294.16, 156.578]
          break
      }
      if (data) {
        dashBoard.setData(data)
        success()
        return
      }
      fail()
    })
    .catch(() => {
      fail()
    })
}
