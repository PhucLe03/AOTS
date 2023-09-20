import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import UserView from "@/views/APIs/UserView.vue"
import UserProfileView from "@/views/APIs/ProfileViews/UserProfileView.vue";
import RoomView from "@/views/APIs/RoomView.vue"
import RoomInfoView from "@/views/APIs/ProfileViews/RoomInfoView.vue";
import RoomServicesView from "@/views/APIs/ProfileViews/RoomServicesView.vue"
import ServiceView from "@/views/APIs/ServiceView.vue";
import ServiceInfoView from "@/views/APIs/ProfileViews/ServiceInfoView.vue";

import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/privacy", name: "Privacy", component: PrivacyView },
  { path: "/api/renters", name: "Renters", component: UserView },
  { path: "/api/renter/:id", name: "Renter", component: UserProfileView },
  { path: "/api/rooms", name: "Rooms", component: RoomView },
  { path: "/api/room/:id", name: "Room", component: RoomInfoView },
  { path: "/api/room/:id/services", name: "RoomServices", component: RoomServicesView },
  { path: "/api/services", name: "Services", component: ServiceView },
  { path: "/api/service/:id", name: "Service", component: ServiceInfoView },
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
