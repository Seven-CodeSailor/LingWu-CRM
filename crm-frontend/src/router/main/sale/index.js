const routes = [
  {
    path: '/sale',
    redirect: '/sale/opportunity',
    children: [
      {
        // 销售机会
        path: '/sale/opportunity',
        name: 'opportunity',
        component: () => import('@/views/sale/opportunity/Opportunity.vue')
      },
      {
        // 跟踪记录
        path: '/sale/trackRecords',
        name: 'trackRecords',
        component: () => import('@/views/sale/trackRecords/TrackRecords.vue')
      },
      {
        // 销售合同
        path: '/sale/saleContract',
        name: 'saleContract',
        component: () => import('@/views/sale/saleContract/SaleContract.vue')
      },
      {
        // 销售简报
        path: '/sale/saleKit',
        name: 'saleKit',
        component: () => import('@/views/sale/saleKit/SaleKit.vue')
      }
    ]
  }
]

export default routes
