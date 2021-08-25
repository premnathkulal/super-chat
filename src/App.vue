<template>
  <div id="app">
    <div class="chat-window">
      <side-bar-menu
        v-if="
          ((smallDevice && openDrawer) || !smallDevice || !homePage) &&
          pageName !== 'Auth'
        "
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
import ErrorPages from "@/components/ErrorPages.vue";
import SideBarMenu from "@/components/SideBarMenu.vue";
import Contacts from "@/components/Contacts.vue";
import TopBar from "@/components/TopBar.vue";
import MessageInput from "@/components/MessageInput.vue";
import router from "./router";

@Component({
  components: {
    ErrorPages,
    SideBarMenu,
    Contacts,
    TopBar,
    MessageInput,
  },
})
export default class ChatApp extends Vue {
  isOnline = false;
  homePage = true;
  pageName = "";
  smallDevice = false;
  openDrawer = true;
  messageText = "";
  chatTabType = "all";
  tabType = "all";

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
    //
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
    if (this.pageName !== tabType && tabType !== "theme-change") {
      router.push({ name: tabType });
      return;
    }
  }

  created(): void {
    this.changedWidth();
    window.addEventListener("resize", this.changedWidth);
  }
}
</script>

<style lang="scss">
* {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-display: swap;
  padding: 0;
  margin: 0;
}

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

#EmojiPicker {
  display: block;
  width: 100%;
  margin-bottom: -0.5rem;
  transition: 0.2s;
  #Emojis {
    .container-emoji {
      height: 13rem;
    }
  }
}

a {
  color: #2e008a;
  font-weight: bold;
  background: rgba(190, 225, 247, 0.445);
}
</style>
