import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// svg图标
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 全局注册组件
import globalComponents from '@/components'
import router from '@/router'
import pinia from '@/store'
// 引入路由鉴权文件
import '@/permission'
import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(globalComponents)
app.use(pinia)
app.use(router)
import { isHasButton } from './directive/has'
isHasButton(app) // 注册全局指令
app.mount('#app')
