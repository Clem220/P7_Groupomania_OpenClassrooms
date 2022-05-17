import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/homeView.vue'
import postView from '@/views/postView'
import profilView from '@/views/profilView'
import moderationView from '@/views/moderationView'

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
    path: '/profilView',
    name: 'profil',
    component: profilView
  },
  {
    path: '/moderationView',
    name: 'moderationView',
    component: moderationView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const Access = ["/"]
  const pagesVerif = !Access.includes(to.path)
  const loggedIn = sessionStorage.getItem("userId")
  const sessionToken = sessionStorage.getItem("token")
  if (pagesVerif && !loggedIn && !sessionToken) {
      return next("/")
  }
  next()
}) 

export default router
