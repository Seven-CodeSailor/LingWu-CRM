/*
 * @Author: sayoriqwq 2531600563@qq.com
 * @Date: 2023-11-05 21:18:17
 * @LastEditors: sayoriqwq 2531600563@qq.com
 * @LastEditTime: 2023-11-08 22:06:53
 * @FilePath: \zero-one-crmsys\crm-frontend\vite.config.js
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
        '/api/login/': {
          changeOrigin: true,
          target: 'http://39.101.76.24:10200/',
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 销售合同
        '/api/sales-contract': {
          changeOrigin: true,
          target: 'http://43.138.164.141:8090',
          rewrite: (path) => path.replace(/^\/api\/sales-contract/, '')
        },
        // 销售机会本地测试
        '/api/sales-opportunities': {
          changeOrigin: true,
          target: 'http://124.221.254.153:8090',
          rewrite: (path) => path.replace(/^\/api\/sales-opportunities/, '')
        },
        // 本地测试用
        '/api/java3-personalhomepage': {
          changeOrigin: true,
          target: 'http://1.15.64.225:10032',
          rewrite: (path) => path.replace(/^\/api\/java3-personalhomepage/, '')
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
        // 资金注入抽取=>暮秋
        '/api/fin-capital-record': {
          changeOrigin: true,
          target: 'http://8.130.119.183:8090',
          rewrite: (path) => path.replace(/^\/api\/fin-capital-record/, '')
        },
        // c1的银行账号管理
        '/api/cpp1-apiv1': {
          changeOrigin: true,
          target: 'http://8.130.16.24:8090',
          rewrite: (path) => path.replace(/^\/api\/cpp1-apiv1/, '')
        },
        '/api/collection-man/': {
          changeOrigin: true,
          target: 'http://47.115.229.117:8090',
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/api/java3-personal-homepage': {
          changeOrigin: true,
          target: 'http://1.15.64.225:10032',
          rewrite: (path) => path.replace(/^\/api\/java3-personal-homepage/, '')
        },
        '/api/cpp1-dictionary': {
          '/api/java4-apiv1': {
            changeOrigin: true,
            target: 'http://47.115.221.50:10086',
            rewrite: (path) => path.replace(/^\/api\/java4-apiv1/, '')
          },
          '/api/cpp1-apiv1': {
            changeOrigin: true,
            target: 'http://8.130.16.24:8090',
            rewrite: (path) => path.replace(/^\/api\/cpp1-apiv1/, '')
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
            target: 'http://8.130.30.150:10001',
            rewrite: (path) => path.replace(/^\/api/, '')
          },
          '/captcha': {
            changeOrigin: true,
            target: 'http://localhost:10680',
            rewrite: (path) => path.replace(/^\/captcha/, '')
          }
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
