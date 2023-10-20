/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-10-20 17:30:31
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-10-20 18:35:31
 * @FilePath: \zero-one-crmsys\crm-frontend\src\router\sample\index.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
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
          import('@/views/sample/orgStructure/OrganizationStructureView.vue')
      },
      {
        path: '/sample/newsCenter',
        component: () => import('@/views/sample/newsCenter/NewsCenterView.vue')
      }
    ]
  }
]

export default routes
