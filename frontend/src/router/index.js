import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'
import ForgotPassword from '@/views/Auth/ForgotPassword.vue'
import Signup from '@/views/Auth/Signup.vue'
import Login from '@/views/Auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'myprofile',
      component: Profile
    },
    {
      path: '/profile/:user_id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/account/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/account/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/account/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword
    }
  ]
})

export default router
