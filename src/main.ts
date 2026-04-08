import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
// 全局注册组件
import globalComponents from '@/components'
import router from '@/router'
import pinia from '@/store'
import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })
app.use(globalComponents)
app.use(pinia)
app.use(router)
app.mount('#app')
