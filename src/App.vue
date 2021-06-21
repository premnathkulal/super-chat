<template>
  <div id="app">
    <v-app>
      <v-app-bar app color="primary" dark>
        <div @click="navigate('Home')" class="d-flex align-center">
          <h5 v-if="homePage" class="mr-2" :style="{ cursor: 'pointer' }">
            Super Chat
          </h5>
          <v-icon v-else>mdi-arrow-left</v-icon
          ><strong class="ml-5">{{ this.pageName }}</strong>
        </div>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-btn v-if="!user" text @click="dialog = true">
                <span class="mr-2">Login</span>
              </v-btn>
              <v-btn v-else text @click="logout()">
                <span class="mr-2">Logout</span>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn v-if="user" text @click="navigate('ChatApp')">
                <v-icon>mdi-chat</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main>
        <router-view v-if="user && isOnline" />
        <error-pages
          v-else
          :pageName="!user && isOnline ? 'login' : 'noInternet'"
          @showModal="dialog = true"
        />
      </v-main>
    </v-app>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <login />
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import firebase from "firebase";
import Login from "@/components/Login.vue";
import ErrorPages from "@/components/ErrorPages.vue";
import router from "./router";
import { ContactActions, UserActions } from "@/types/types";

const contact = namespace("Contacts");
const user = namespace("User");

@Component({
  components: {
    Login,
    ErrorPages,
  },
})
export default class ChatApp extends Vue {
  dialog = false;
  user = firebase.auth().currentUser;
  isOnline = false;
  homePage = true;
  pageName = "";

  @user.Action(UserActions.SET_USER_ID_EMAIL)
  public setUserIdemail!: (userIdEmail: any | null) => void;

  @contact.Action(ContactActions.SET_USER_ID)
  public setUserId!: (userId: string | null) => void;

  @contact.Action(ContactActions.LOAD_CONTACTS)
  public loadContacts!: () => void;

  logout(): void {
    firebase.auth().signOut();
    this.user = null;
  }

  async setUserInfo(): Promise<void> {
    this.isOnline = window.navigator.onLine;
    if (this.user) {
      await this.setUserId(this.user.uid);
      await this.setUserIdemail({ email: this.user.email, uid: this.user.uid });
      await this.loadContacts();
    }
  }

  @Watch("$route.name")
  setTopBar() {
    const routeName: any[] = ["Profile", "Group", "PersonalChat"];
    this.homePage = true;
    this.pageName = "";
    if (routeName.includes(this.$route.name)) {
      this.homePage = false;
      this.pageName = this.$route.name as string;
    }
    console.log(this.$route.name);
  }

  navigate(name: string): void {
    if (this.user) {
      if (name === "Home" && router.currentRoute.name !== "Contacts") {
        router.push({ name: "Contacts" });
        return;
      }
      if (router.currentRoute.name !== name) {
        router.push({ name });
      }
    }
  }

  created(): void {
    this.setUserInfo();
    this.setTopBar();
  }
}
</script>
