const routes = [
  {
    path: '/basicData',
    redirect: '/basicData/notice',
    children: [
      {
        // 数据字典
        path: '/basicData/dictionary',
        name: 'dictionary',
        redirect: '/basicData/dictionary/classification',
        children: [
          {
            // 字典分类
            path: '/basicData/dictionary/classification',
            name: 'classification',
            component: () =>
              import(
                '@/views/basic-data/data-dictionary/classification/Classification.vue'
              )
          },
          {
            // 字典分类
            path: '/basicData/dictionary/management',
            name: 'management',
            component: () =>
              import(
                '@/views/basic-data/data-dictionary/management/Management.vue'
              )
          }
        ]
      },
      {
        // 地区管理
        path: '/basicData/regional',
        name: 'regional',
        component: () => import('@/views/basic-data/regional/Regional.vue')
      },
      {
        // 财务类型
        path: '/basicData/financial',
        name: 'financial',
        redirect: '/basicData/dictionary/classification',
        children: [
          {
            // 费用收入类型
            path: '/basicData/financial/income',
            name: 'income',
            component: () =>
              import('@/views/basic-data/financial-type/income/Income.vue')
          },
          {
            // 费用开支类型
            path: '/basicData/financial/expense',
            name: 'expense',
            component: () =>
              import('@/views/basic-data/financial-type/expense/Expense.vue')
          },
          {
            // 银行账号管理
            path: '/basicData/financial/bankAccount',
            name: 'bankAccount',
            component: () =>
              import(
                '@/views/basic-data/financial-type/bank-account/BankAccount.vue'
              )
          }
        ]
      },
      {
        // 仓库管理
        path: '/basicData/warehouse',
        name: 'warehouse',
        component: () => import('@/views/basic-data/warehouse/Warehouse.vue')
      },
      {
        // 商品管理
        path: '/basicData/product',
        name: 'product',
        component: () => import('@/views/basic-data/product/Product.vue')
      }
    ]
  }
]

export default routes
