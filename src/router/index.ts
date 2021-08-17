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
    path: "/chat/:id?",
    name: "PersonalChat",
    component: PersonalChat,
  },
  {
    path: "/poolChat",
    name: "ChatApp",
    component: ChatApp,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
