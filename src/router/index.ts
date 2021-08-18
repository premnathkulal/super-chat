import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ChatApp from "../views/ChatApp.vue";
import Home from "../views/Home.vue";
import PersonalChat from "../views/personalChat.vue";
// import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: 'Profile' */ "@/views/Profile.vue"),
  },
  {
    path: "/create",
    name: "Create",
    component: () =>
      import(/* webpackChunkName: 'Profile' */ "@/views/CreateRoom.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
