const routes = [
  {
    path: '/sample',
    name: 'Sample',
    redirect: { path: '/sample/file' },
    component: () => import('@/views/sample/SampleView.vue'),
    children: [
      {
        path: '/sample/file',
        component: () => import('@/views/sample/file/FileUpload.vue')
      },
      {
        path: '/sample/excel',
        component: () => import('@/views/sample/excel/Excel.vue')
      },
      {
        path: '/sample/print',
        component: () => import('@/views/sample/print/Print.vue')
      },
      {
        path: '/sample/editor',
        component: () => import('@/views/sample/editor/Editor.vue')
      },
      {
        path: '/sample/organizationStructure',
        component: () =>
          import(
            '@/views/sample/organizationStructure/OrganizationStructureView.vue'
          )
      }
    ]
  }
]

export default routes
