import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './theme.css'

import { createHead } from '@vueuse/head'

const app = createApp(App)

const head = createHead()

app.use(router)
app.use(head)

app.mount('#app')
