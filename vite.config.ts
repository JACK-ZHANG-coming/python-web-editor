import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // vueDevTools(),
    viteStaticCopy({
      targets: [{
        src: 'node_modules/pyodide/**/*',
        dest: 'assets'
      }]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    exclude: ['pyodide'] // 开发环境排除Pyodide预构建
  },
  //全局变量
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/css/variable.scss";`
        additionalData: `@use "@/assets/css/variable.scss" as *;`
      }
    }
  }
})
