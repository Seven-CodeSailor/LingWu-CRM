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
        path: '/sample/file',
        component: () => import('@/views/sample/file/FileUpload.vue'),
        meta: {
          text: '文件上传'
        }
      },
      {
        path: '/sample/excel',
        component: () => import('@/views/sample/excel/Excel.vue'),
        meta: {
          text: 'Excel演示'
        }
      },
      {
        path: '/sample/print',
        component: () => import('@/views/sample/print/Print.vue'),
        meta: {
          text: '打印演示'
        }
      },
      {
        path: '/sample/editor',
        component: () => import('@/views/sample/editor/Editor.vue'),
        meta: {
          text: '富文本框演示'
        }
      },
      {
        path: '/sample/test',
        component: () => import('@/views/sample/TestView.vue'),
        meta: {
          text: '测试专用1'
        }
      }
    ]
  }
]

export default routes
