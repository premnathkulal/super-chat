import Vue from "vue";
import Vuex from "vuex";
import Contacts from "@/store/modules/conatcts";
import User from "@/store/modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Contacts,
    User,
  },
});
