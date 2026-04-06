import { defineConfig } from 'vite'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({command}) =>{
  return {
    plugins: [
    vue(),
    createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    symbolId: 'icon-[dir]-[name]',}),
    viteMockServe({
      mockPath: 'mock',
      enable: command === 'serve',
      watchFiles: true,
    })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // 全局引入scss变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/variable.scss";',
        },
      },
    },
  }
})
