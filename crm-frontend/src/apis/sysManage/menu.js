import Request from '../request'

const baseUrl = '/menu'
const getSysMenuTree = (data, success, fail) => {
  Request.requestForm(Request.GET, baseUrl + '/tree')
    .then((data) => {
      if (data.data) {
        success()
        return
      }
      fail()
    })
    .catch((err) => {
      console.warn(err)
      fail()
    })
}

export { getSysMenuTree }
