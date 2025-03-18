import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/name/:nm',
      name: 'SchoolData',
      component: () => import('../views/SchoolData.vue'),
    },
    {
      path: '/',
      name: 'RandomName',
      component: () => import('../views/RandomName.vue'),
    },
  ],
})

export default router
