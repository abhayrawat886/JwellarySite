import { createRouter, createWebHashHistory } from 'vue-router'
import HomeDashboard from '../components/homedashboard.vue'
import About from '../components/about.vue'
import ProductDetail from '../views/collections/productdetail.vue'
import Collections from '../views/collections.vue'

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
        path: '/collections',
        name: 'Collections',
        component: Collections
    },
    {
        path: '/collections/:id',
        name: 'ProductDetail',
        component: ProductDetail
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    }
})

export default router
