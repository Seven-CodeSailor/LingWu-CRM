/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-11-05 21:18:17
 * @LastEditors: 暮秋pro oncwnuDcKAa9aHtUN1_rnIGw84kY@git.weixin.qq.com
 * @LastEditTime: 2023-11-06 21:36:33
 * @FilePath: \crm-frontend\vite.config.js
 * @Description:
 *
 * Copyright (c) 2023 by sayoriqwq 2531600563@qq.com, All Rights Reserved.
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'

const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target]
}

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    server: {
      host: '0.0.0.0',
      port: 3000,
      https: false,
      proxy: {
        '/api/java3-personal-homepage': {
          changeOrigin: true,
          target: 'http://1.15.64.225:10032',
          rewrite: (path) => path.replace(/^\/api\/java3-personal-homepage/, '')
        },
        '/api/cpp1-dictionary': {
          changeOrigin: true,
          target: 'http://8.130.16.24:8090',
          rewrite: (path) => path.replace(/^\/api\/cpp1-dictionary/, '')
        },
        // 库存管理接口的跨域处理
        '/api/cpp5-inventory': {
          changeOrigin: true,
          target: 'http://47.108.95.155:8090',
          rewrite: (path) => path.replace(/^\/api\/cpp5-inventory/, '')
        },
        '/api/java3-file': {
          changeOrigin: true,
          target: 'http://8.130.45.222:8888',
          rewrite: (path) => path.replace(/^\/api\/java3-file/, '')
        },
        '/api/java3-warehouse': {
          changeOrigin: true,
          target: 'http://8.130.82.226:10033',
          rewrite: (path) => path.replace(/^\/api\/java3-warehouse/, '')
        },
        '/api/java3-area': {
          changeOrigin: true,
          target: 'http://118.31.61.96:10031',
          rewrite: (path) => path.replace(/^\/api\/java3-area/, '')
        },
        '/api': {
          changeOrigin: true,
          // target: 'http://localhost:10100',
          // rewrite: (path) => path.replace(/^\/api/, '')

          //TODO[TEST_CODE]:使用ApiPost云MOCK
          target: 'http://8.130.30.150:10001',
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/captcha': {
          changeOrigin: true,
          target: 'http://localhost:10680',
          rewrite: (path) => path.replace(/^\/captcha/, '')
        }
      }
    },
    build: {
      assetsDir: 'static',
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          }
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: getViteEnv(mode, 'VITE_APP_TITLE')
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
