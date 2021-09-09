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
        @loadMessage="loadMessage"
      />
      <div
        v-if="(smallDevice && !openDrawer) || !smallDevice"
        class="chat-block"
      >
        <welcome-screen v-if="homePage && !chatLoaded" />
        <top-bar
          v-if="homePage && chatLoaded"
          :tabType="tabType"
          :showMenuIcon="smallDevice"
          :groupInfo="groupInfo"
          @toggleDrawer="toggleDrawer()"
        />
        <router-view class="router-view" />
        <message-input v-if="homePage && chatLoaded" :groupInfo="groupInfo" />
      </div>
      <router-view v-else-if="!homePage && chatLoaded" class="router-view" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ErrorPages from '@/components/ErrorPages.vue';
import SideBarMenu from '@/components/SideBarMenu.vue';
import Contacts from '@/components/Contacts.vue';
import TopBar from '@/components/TopBar.vue';
import MessageInput from '@/components/MessageInput.vue';
import WelcomeScreen from '@/components/WelcomeScreen.vue';
import router from './router';
import { namespace } from 'vuex-class';
import {
  ChatActions,
  ContactActions,
  SocketActions,
  UserActions,
} from './types/types';

const contacts = namespace('Contacts');
const socket = namespace('Socket');
const chat = namespace('Chat');
const user = namespace('User');

@Component({
  components: {
    ErrorPages,
    SideBarMenu,
    Contacts,
    TopBar,
    MessageInput,
    WelcomeScreen,
  },
})
export default class ChatApp extends Vue {
  isOnline = false;
  homePage = true;
  pageName = '';
  smallDevice = false;
  openDrawer = true;
  messageText = '';
  chatTabType = 'all';
  tabType = 'all';
  chatLoaded = false;
  groupInfo = {};

  @user.Getter
  public userToken!: string;

  @user.Action(UserActions.IS_LOGGED_IN)
  public isLoggedIn!: () => void;

  @user.Action(UserActions.GET_USER_INFO)
  public loadUserInfo!: () => void;

  @socket.Action(SocketActions.CONNECTION)
  public connectToSocket!: () => void;

  @contacts.Action(ContactActions.LOAD_GROUP)
  public loadAllGroups!: () => void;

  @chat.Action(ChatActions.LOAD_CHAT)
  public loadChats!: (id: string) => void;

  @Watch('userToken')
  isUserLoggedIn(): void {
    if (this.userToken) {
      this.connectToSocket();
      this.loadAllGroups();
      this.loadUserInfo();
      return;
    }
    router.push({ name: 'Auth' });
  }

  @Watch('window.innerWidth')
  changedWidth(): void {
    this.smallDevice = false;
    if (window.innerWidth <= 800) {
      this.smallDevice = true;
    }
  }

  @Watch('$route.name')
  setTopBar(): void {
    this.homePage = false;
    this.pageName = this.$route.name || '';
    if (this.pageName === 'Home') {
      this.homePage = true;
    }
  }

  toggleDrawer(): void {
    this.openDrawer = !this.openDrawer;
  }

  loadMessage(groupInfo: {
    _id: string;
    groupName: string;
    groupOwners: string[];
  }): void {
    this.loadChats(groupInfo._id);
    this.groupInfo = groupInfo;
    this.openDrawer = false;
    this.chatLoaded = true;
  }

  selectTabType(tabType: string): void {
    this.pageName = this.$route.name || '';
    this.tabType = tabType;
    if (tabType === 'personal' || tabType === 'group') {
      if (this.pageName !== 'Home') {
        router.push({ name: 'Home' });
      }
      this.chatTabType = tabType;
      return;
    }
    if (this.pageName !== tabType && tabType !== 'theme-change') {
      router.push({ name: tabType });
      return;
    }
  }

  async created(): Promise<void> {
    this.changedWidth();
    window.addEventListener('resize', this.changedWidth);
    await this.isLoggedIn();
    this.isUserLoggedIn();
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
