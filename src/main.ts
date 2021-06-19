import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import vuetify from "./plugins/vuetify";
import "@lottiefiles/lottie-player";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyD9LY0107Cm4paMlakq_lp0OeTiDEbXP-c",
  authDomain: "super-chat-e211c.firebaseapp.com",
  projectId: "super-chat-e211c",
  storageBucket: "super-chat-e211c.appspot.com",
  messagingSenderId: "408513618263",
  appId: "1:408513618263:web:7bd6cd9d0cdb97e3ff9e12",
  measurementId: "G-TQ28RTDZN7",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(() =>
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app")
);
