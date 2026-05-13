import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LandingPage.vue'
import SignupPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',  name: 'landing',  component: LandingPage },
    { path: '/login',  name: 'login',  component: LoginPage },
    { path: '/signup',  name: 'signup',  component: SignupPage },
  ],
})

export default router
