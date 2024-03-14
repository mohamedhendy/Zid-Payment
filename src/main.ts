import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// @ts-ignore
import VueTheMask from 'vue-the-mask'

const app = createApp(App)
// @ts-ignore
app.use(router)
app.use(VueTheMask)

app.mount('#app')
