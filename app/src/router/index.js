import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RandomName from '@/views/RandomName.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*     {
      path: '/home',
      name: 'home',
      component: HomeView,
    }, */
    {
      path: '/name/:nm',
      name: 'NameData',
      component: () => import('../views/NameData.vue'),
    },
    {
      path: '/',
      name: 'RandomName',
      component: RandomName,
    },
    {
      path: '/results',
      name: 'TheResults',
      component: () => import('../views/TheResults.vue'),
    },
  ],
})

export default router
