import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
// import UserProfileView from "@/views/UserProfileView.vue";
import UserView from "@/views/APIs/UserView.vue"
import RoomView from "@/views/APIs/RoomView.vue"
import ServiceView from "@/views/APIs/ServiceView.vue"

import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/privacy", name: "Privacy", component: PrivacyView },
  // { path: "/user/:id", name: "User", component: UserProfileView },
  { path: "/api/users", name: "Users", component: UserView },
  { path: "/api/rooms", name: "Rooms", component: RoomView },
  { path: "/api/services", name: "Services", component: ServiceView },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
