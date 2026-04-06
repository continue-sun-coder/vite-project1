import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'virtual:svg-icons-register'
import App from '@/App.vue'

const app = createApp(App)
app.use(ElementPlus, { locale: zhCn })

// 全局注册组件
import globalComponents from '@/components'
app.use(globalComponents)

// 引入全局样式
import '@/styles/index.scss'

app.mount('#app')
