import { createRouter, createWebHistory } from 'vue-router'
import HomeDashboard from '../components/homeDashboard.vue'
import About from '../components/about.vue'

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: HomeDashboard
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
