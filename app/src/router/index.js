import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/school/:dbn',
      name: 'SchoolData',
      component: () => import('../views/SchoolData.vue'),
    },
  ],
})

export default router
