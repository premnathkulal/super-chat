import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "@/plugins/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import vuetify from "./plugins/vuetify";
import "@lottiefiles/lottie-player";

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() =>
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
);
