import { createApp } from 'vue'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import DirectivesSample from './views/DirectivesSample.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/directives', component: DirectivesSample },
]

import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')