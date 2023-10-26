const customer = {
  text: '客户管理',
  href: '/customer',
  icon: 'IconHouse',
  children: [
    {
      text: '我的客户',
      href: '/customer/client',
      icon: 'IconHouse'
    },
    {
      text: '下属客户',
      href: '/customer/subCustomers',
      icon: 'IconHouse'
    },
    {
      text: '公海客户',
      href: '/customer/seasClients',
      icon: 'IconHouse'
    },
    {
      text: '联系人',
      href: '/customer/contacts',
      icon: 'IconHouse'
    },
    {
      text: '服务记录',
      href: '/customer/serviceRecord',
      icon: 'IconHouse'
    }
  ]
}

export default customer
