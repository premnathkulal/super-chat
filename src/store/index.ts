import Vue from "vue";
import Vuex from "vuex";
import Contacts from "@/store/modules/conatcts";
import User from "@/store/modules/user";
import Chat from "@/store/modules/chat";
import Socket from "@/store/modules/socket";
import SocketHelper from "@/plugins/socket-helper";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Contacts,
    User,
    Chat,
    Socket,
  },
});

export const connectionSocket = new SocketHelper();
