import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoomView from '../views/RoomView.vue'
import RenterView from '../views/RenterView.vue'
import ServiceView from '../views/ServiceView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/room',
            name: 'room',
            component: RoomView
        },
        {
            path: '/renter',
            name: 'renter',
            component: RenterView
        },
        {
            path: '/service',
            name: 'service',
            component: ServiceView
        }
    ]
})

export default router