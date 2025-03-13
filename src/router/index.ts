import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DriversView from '../views/DriversView.vue'
import ConstructorsView from '../views/ConstructorsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: DriversView
    },
    {
      path: '/constructors',
      name: 'constructors',
      component: ConstructorsView
    }
  ],
})

export default router
