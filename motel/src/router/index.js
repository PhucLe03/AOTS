import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PrivacyView from "@/views/PrivacyView.vue";
import UserView from "@/views/APIs/UserView.vue";
import UserProfileView from "@/views/APIs/ProfileViews/UserProfileView.vue";
import RoomView from "@/views/APIs/RoomView.vue";
import RoomInfoView from "@/views/APIs/ProfileViews/RoomInfoView.vue";
import RoomServicesView from "@/views/APIs/ProfileViews/RoomServicesView.vue";
import ServiceView from "@/views/APIs/ServiceView.vue";
import ServiceInfoView from "@/views/APIs/ProfileViews/ServiceInfoView.vue";

import TempView from "@/views/TempView.vue"
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      title: "Home Page",
    },
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
    meta: {
      title: "About",
    },
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: PrivacyView,
    meta: {
      title: "Privacy",
    },
  },
  {
    path: "/api/renters",
    name: "Renters",
    component: UserView,
    meta: {
      title: "Renters",
    },
  },
  { path: "/api/renter/:id", name: "Renter", component: UserProfileView },
  {
    path: "/api/rooms",
    name: "Rooms",
    component: RoomView,
    meta: {
      title: "Rooms",
    },
  },
  { path: "/api/room/:id", name: "Room", component: RoomInfoView, },
  {
    path: "/api/room/:id/services",
    name: "RoomServices",
    component: RoomServicesView,
  },
  {
    path: "/api/services",
    name: "Services",
    component: ServiceView,
    meta: {
      title: "Services",
    },
  },
  { path: "/api/service/:id", name: "Service", component: ServiceInfoView },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: PageNotFound,
  },
  { path: "/temp", name: "Temp", component: TempView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const nearestWithTitle = to.matched
//     .slice()
//     .reverse()
//     .find((r) => r.meta && r.meta.title);

//   if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

//   next();
// });

router.beforeEach((to, from, next) => {
  const titleFromParams = to.params?.pageTitle;

  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  } else {
    document.title = to.meta?.title ?? "GTAHOTEL";
  }

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  next();
});

export default router;
