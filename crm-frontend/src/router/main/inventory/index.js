const routes = [
  {
  path: '/sample',
  name: 'Sample',
  meta: {
    text: '样本'
  },
  redirect: { path: '/sample/file' },
  component: () => import('@/views/sample/SampleView.vue'),
  children: [
    {
      path: '/outstorage',
      component: () => import('@/views/inventoryManagement/OutStorage.vue')
    }
  ]
}
  
]

export default routes
