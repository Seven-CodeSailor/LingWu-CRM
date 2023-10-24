const routes = [
  {
    path: '/inventory',
    name: 'Inventory',
    // 路由重定向配置暂定=>晚上开会讨论
    component: () =>
      import('@/views/inventoryManagement/inventoryManagement.vue'),
    children: [
      {
        // 出库单  1
        path: '/inventory/WarehousingDetails',
        name: 'WarehousingDetails',
        component: () =>
          import(
            '@/views/inventoryManagement/StorageDetails/StorageDetails.vue'
          )
      },
      {
        // 出库明细  1
        path: '/inventory/outstoragedetails',
        name: 'outstoragedetails',
        component: () =>
          import(
            '@/views/inventoryManagement/outstoragedetails/OutStorageDetails.vue'
          )
      },
      {
        // 入库明细
        path: '/inventory/bingwu',
        name: 'ru_ku_ming_xi',
        component: () =>
          import(
            '@/views/inventoryManagement/StockStorageDetails/StockStorageDetails.vue'
          )
      },
      {
        // 入库单
        path: '/inventory/qianmeng',
        name: 'ru_ku_dan',
        component: () =>
          import('@/views/inventoryManagement/StorageReceipt/index.vue')
      },
      {
        // 库存清单
        path: '/inventory/pipazi',
        name: 'ru_ku_qing_dan',
        component: () =>
          import('@/views/inventoryManagement/InventoryList/InventoryList.vue')
      }
    ]
  }
]

export default routes
