import { createApp } from 'vue'
import './style.css'
import './style.scss'
import router from './router'
import App from './app.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
