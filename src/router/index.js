import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import signupForm from '../views/signupForm'
import postView from '../views/postView'
import profilView from '../views/profilView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/postView',
    name: 'postView',
    component: postView
  },
  {
    path: '/signup',
    name: 'signup',
    component: signupForm
  },
  {
    path: '/profilView',
    name: 'profil',
    component: profilView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
