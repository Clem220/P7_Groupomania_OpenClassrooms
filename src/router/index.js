import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/views/homeView.vue";
import postView from "@/views/postView";
import profilView from "@/views/profilView";
import moderationView from "@/views/moderationView";

/*** Définition des différentes routes vers les Views */
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/postView",
    name: "postView",
    component: postView,
  },

  {
    path: "/profilView",
    name: "profil",
    component: profilView,
  },
  {
    path: "/moderationView",
    name: "moderationView",
    component: moderationView,
  },
];
/*** Création du routeur */
const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes,
});

export default router;
