import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'
import CalendarPage from '../views/CalendarPage.vue'
import AdminPage from '../views/AdminPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/calendar', component: CalendarPage },
    { path: '/admin', component: AdminPage },
  ],
})

export default router
