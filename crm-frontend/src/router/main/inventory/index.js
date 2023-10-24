const routes = [
  {
    path: '/inventory',
    name: 'Inventory',
    // 路由重定向配置暂定=>晚上开会讨论
    component: () =>
      import('@/views/inventoryManagement/inventoryManagement.vue'),
    children: [
      {
        // 入库明细
        path: '/inventory/WarehousingDetails',
        name: 'WarehousingDetails',
        component: () =>
          import(
            '@/views/inventoryManagement/StorageDetails/StorageDetails.vue'
          )
      },
      {
        // 出库明细
        path: '/inventory/outstoragedetails',
        name: 'outstoragedetails',
        component: () =>
          import(
            '@/views/inventoryManagement/outstoragedetails/OutStorageDetails.vue'
          )
      }
    ]
  }
]

export default routes
