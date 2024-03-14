import { createRouter, createWebHistory } from 'vue-router'
import UserProfile from '../views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'profile',
      component: UserProfile
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('../views/UserPayments.vue')
    }
  ]
})

export default router
