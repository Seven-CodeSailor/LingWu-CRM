/*
 * @Author: setti5 2283356040@qq.com
 * @Date: 2023-10-20 22:10:31
 * @LastEditors: setti5 2283356040@qq.com
 * @LastEditTime: 2023-11-04 21:21:19
 * @FilePath: \zero-one-crmsys\crm-frontend\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @Author: BINGWU
 * @Date: 2023-10-26 20:52:05
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2023-11-04 18:07:42
 * @FilePath: \crm-frontend\vite.config.js
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
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
        '/api/pipazi': {
          changeOrigin: true,
          target: 'http://1.15.64.225:10032',
          rewrite: (path) => path.replace(/^\/api\/pipazi/, ''),
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
          target:
            'https://console-mock.apipost.cn/mock/99738a62-8857-4bb2-8010-c92424b03584',
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/captcha': {
          changeOrigin: true,
          target: 'http://localhost:10680',
          rewrite: (path) => path.replace(/^\/captcha/, '')
        },
        '/api1': {
          changeOrigin: true,
          target: 'http://118.31.61.96:10031',
          rewrite: (path) => path.replace(/^\/api1/, '')
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
  }})

