import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'
import CalendarPage from '../views/CalendarPage.vue'
import AdminPage from '../views/AdminPage.vue'
import EventUploadPage from '@/views/EventUploadPage.vue'
import ClubProfilePage from '@/views/ClubProfilePage.vue'
import GeneralMeetingsPage from '@/views/GeneralMeetingsPage.vue'
import AdminSettingsPage from '@/views/AdminSettingsPage.vue'
import UserSettingsPage from '@/views/UserSettingsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/calendar', component: CalendarPage },
    { path: '/settings', component: UserSettingsPage },
    { path: '/admin', component: AdminPage },
    { path: '/admin/new-event', component: EventUploadPage },
    { path: '/admin/update-home', component: ClubProfilePage },
    { path: '/admin/update-gm', component: GeneralMeetingsPage },
    { path: '/admin/settings', component: AdminSettingsPage },
  ],
})

export default router
