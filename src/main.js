import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/base.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
// import { PrLock } from 'oh-vue-icons/icons'

import * as PrIcons from 'oh-vue-icons/icons/pr'
const Pr = Object.values({ ...PrIcons })

addIcons(...Pr)

const app = createApp(App)

app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
