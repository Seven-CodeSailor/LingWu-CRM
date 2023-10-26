const fund = {
  text: '资金管理',
  href: '/fund',
  icon: 'IconHouse',
  children: [
    {
      text: '资金注入抽取',
      href: '/fund/injectionExtraction',
      icon: 'IconHouse'
    },
    {
      text: '回款管理',
      href: '/fund/collection',
      icon: 'IconHouse',
      children: [
        {
          text: '回款计划',
          href: '/fund/collection/collectionPlan',
          icon: 'IconHouse'
        },
        {
          text: '回款记录',
          href: '/fund/collection/collectionRecords',
          icon: 'IconHouse'
        },
        {
          text: '开票记录',
          href: '/fund/collection/invoiceRecords',
          icon: 'IconHouse'
        }
      ]
    },
    {
      text: '收入开支',
      href: '/fund/incomeExpense',
      icon: 'IconHouse',
      children: [
        {
          text: '其他收入单',
          href: '/fund/incomeExpense/income',
          icon: 'IconHouse'
        },
        {
          text: '费用支出单',
          href: '/fund/incomeExpense/expense',
          icon: 'IconHouse'
        }
      ]
    },
    {
      text: '账户流水记录',
      href: '/fund/records',
      icon: 'IconHouse'
    },
    {
      text: '付款管理',
      href: '/fund/payment',
      icon: 'IconHouse',
      children: [
        {
          text: '付款计划',
          href: '/fund/payment/plan',
          icon: 'IconHouse'
        },
        {
          text: '付款记录',
          href: '/fund/payment/paymentRecords',
          icon: 'IconHouse'
        },
        {
          text: '收票记录',
          href: '/fund/payment/ticketRecords',
          icon: 'IconHouse'
        }
      ]
    }
  ]
}

export default fund
