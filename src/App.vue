<template>
  <div id="app">
    <div class="chat-window">
      <side-bar-menu
        v-if="(smallDevice && openDrawer) || !smallDevice || !homePage"
        @selectTabType="selectTabType"
      />
      <contacts
        v-if="((smallDevice && openDrawer) || !smallDevice) && homePage"
        :tabType="chatTabType"
        @loadMessage="loadMessage()"
      />
      <div
        v-if="(smallDevice && !openDrawer) || !smallDevice"
        class="chat-block"
      >
        <top-bar
          v-if="homePage"
          :tabType="tabType"
          :showMenuIcon="smallDevice"
          @toggleDrawer="toggleDrawer()"
        />
        <router-view class="router-view" />
        <message-input v-if="homePage" />
      </div>
      <router-view v-else-if="!homePage" class="router-view" />
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
  openDrawer = true;
  messageText = "";
  chatTabType = "all";
  tabType = "all";

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

  @Watch("window.innerWidth")
  changedWidth(): void {
    this.smallDevice = false;
    if (window.innerWidth <= 800) {
      this.smallDevice = true;
    }
  }

  @Watch("$route.name")
  setTopBar(): void {
    this.homePage = false;
    this.pageName = this.$route.name || "";
    if (this.pageName === "Home") {
      this.homePage = true;
    }
  }

  toggleDrawer(): void {
    this.openDrawer = !this.openDrawer;
  }

  logout(): void {
    firebase.auth().signOut();
    this.user = null;
  }

  loadMessage(): void {
    this.openDrawer = false;
  }

  selectTabType(tabType: string): void {
    this.pageName = this.$route.name || "";
    this.tabType = tabType;
    if (tabType === "personal" || tabType === "group") {
      if (this.pageName !== "Home") {
        router.push({ name: "Home" });
      }
      this.chatTabType = tabType;
      return;
    }
    if (this.pageName !== tabType) {
      router.push({ name: tabType });
      return;
    }
  }

  created(): void {
    // if (this.user) {
    //   const userDetails = {
    //     email: this.user.email,
    //   };
    //   this.connectToWsServer(userDetails);
    // }
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
  .router-view {
    width: 100%;
  }
}
</style>