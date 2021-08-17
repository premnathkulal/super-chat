<template>
  <div id="app">
    <div class="chat-window">
      <side-bar-menu v-if="(smallDevice && openDrawer) || !smallDevice" />
      <contacts v-if="(smallDevice && openDrawer) || !smallDevice" />
      <div
        v-if="(smallDevice && !openDrawer) || !smallDevice"
        class="chat-block"
      >
        <top-bar :showMenuIcon="smallDevice" @toggleDrawer="toggleDrawer()" />
        <router-view class="router-view" />

        <!-- <div class="input-area">
          <div class="input-box">
            <i class="fa fa-smile-o"></i>
            <input
              v-model="messageText"
              type="text"
              class="text-box"
              placeholder="Search..."
            />
            <i class="fa fa-paperclip"></i>
            <i class="fa fa-camera"></i>
            <i v-if="!messageText" class="fa fa-paper-plane"></i>
          </div>
          <div class="mic-icon">
            <i v-if="!messageText" class="fa fa-microphone fa-icon"></i>
            <i v-if="messageText" class="fa fa-paper-plane fa-icon"></i>
          </div>
        </div> -->
        <message-input />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import firebase from "firebase";
import Login from "@/components/Login.vue";
import ErrorPages from "@/components/ErrorPages.vue";
import SideBarMenu from "@/components/SideBarMenu.vue";
import Contacts from "@/components/Contacts.vue";
import TopBar from "@/components/TopBar.vue";
import MessageInput from "@/components/MessageInput.vue";
import router from "./router";
import { ContactActions, SocketActions, UserActions } from "@/types/types";

const contact = namespace("Contacts");
const user = namespace("User");
const socket = namespace("Socket");

@Component({
  components: {
    Login,
    ErrorPages,
    SideBarMenu,
    Contacts,
    TopBar,
    MessageInput,
  },
})
export default class ChatApp extends Vue {
  dialog = false;
  user: any = firebase.auth().currentUser;
  isOnline = false;
  homePage = true;
  pageName = "";
  smallDevice = false;
  openDrawer = false;
  messageText = "";

  @socket.Getter("getWelcomeMessage")
  public welcomeMessage!: string;

  @user.Action(UserActions.SET_USER_ID_EMAIL)
  public setUserIdemail!: (
    userIdEmail: { email: string | null; uid: string } | null
  ) => void;

  @contact.Action(ContactActions.SET_USER_ID)
  public setUserId!: (userId: string | null) => void;

  @contact.Action(ContactActions.LOAD_CONTACTS)
  public loadContacts!: () => void;

  @socket.Action(SocketActions.CONNECTION)
  public connectToWsServer!: (userDetails: { email: string }) => void;

  async setUserInfo(): Promise<void> {
    this.isOnline = window.navigator.onLine;
    if (this.user) {
      await this.setUserId(this.user.uid);
      await this.setUserIdemail({ email: this.user.email, uid: this.user.uid });
      await this.loadContacts();
    }
  }

  @Watch("$route.name")
  setTopBar(): void {
    type routeNames = Array<string | null | undefined>;
    const routeName: routeNames = ["Profile", "Group", "PersonalChat"];
    this.homePage = true;
    this.pageName = "";
    if (routeName.includes(this.$route.name)) {
      this.homePage = false;
      this.pageName = this.$route.name as string;
    }
  }

  @Watch("window.innerWidth")
  changedWidth(): void {
    this.smallDevice = false;
    if (window.innerWidth <= 800) {
      this.smallDevice = true;
    }
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

  toggleDrawer(): void {
    this.openDrawer = !this.openDrawer;
  }

  logout(): void {
    firebase.auth().signOut();
    this.user = null;
  }

  created(): void {
    this.setUserInfo();
    this.setTopBar();
    if (this.user) {
      const userDetails = {
        email: this.user.email,
      };
      this.connectToWsServer(userDetails);
    }
    this.changedWidth();
    window.addEventListener("resize", this.changedWidth);
  }
}
</script>

<style lang="scss">
#app {
  .chat-window {
    display: flex;
    flex-direction: row;
    .chat-block {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      .router-view {
        flex: 1;
        overflow-y: scroll;
      }
    }
  }
}
</style>