import { createRouter, createWebHistory } from 'vue-router'
import HomeDashboard from '../components/homeDashboard.vue'
import About from '../components/about.vue'
import ProductDetail from '../views/collections/ProductDetail.vue'

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
    },
    {
        path: '/collections/:id',
        name: 'ProductDetail',
        component: ProductDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: 'smooth' }
    }
})

export default router
