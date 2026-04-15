import { defineConfig, loadEnv } from 'vite'
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入mock插件
import { viteMockServe } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取各种环境下对应的环境变量
  // loadEnv函数的第一个参数是当前的环境，第二个参数是项目根目录的路径，第三个参数是环境变量的前缀，默认为VITE_，也就是说只有以VITE_开头的环境变量才会被加载到process.env中
  // 那么这句话就是获取当前环境下以VITE_开头的环境变量，并返回一个对象，属性名是环境变量的名字，属性值是环境变量的值
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        enable: command === 'serve', // 只在开发环境启用mock
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // 代理跨域
    server: {
      proxy: {
        // 把前段/api的请求代理到后端服务器上，解决跨域问题
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          // 重写路径，把前段/api的请求代理到后端服务器上时，去掉前段的/api
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
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
