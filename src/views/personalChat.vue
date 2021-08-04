<template>
  <div v-if="user" class="container personal-chat-app">
    <div class="messages">
      <DisplyMessages
        :messageId="messageId"
        :reciverEmail="reciverEmail"
        @scrollPage="scrollToTop"
      />
    </div>
    <h2 v-if="isTyping" class="typing-message">Typing...</h2>
    <v-footer>
      <MessageSender :messageId="messageId" />
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/types/types";
import Message from "@/components/Message.vue";
import MessageSender from "@/components/MessageSender.vue";
import DisplyMessages from "@/components/DisplyMessages.vue";
import { ContactList } from "@/types/interface";

const contact = namespace("Contacts");
const user = namespace("User");
const socket = namespace("Socket");

@Component({
  components: {
    Message,
    MessageSender,
    DisplyMessages,
  },
})
export default class PersonalChat extends Vue {
  user = firebase.auth().currentUser;
  messageId = "";
  reciverEmail = "";
  isTyping = false;

  @contact.Getter("loadContacts")
  public contactList!: ContactList[];

  @socket.Getter("getIsUserTyping")
  public userTyping!: string;

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  @Watch("userTyping")
  watchingUserTyping() {
    const userData = JSON.parse(this.userTyping);
    console.log(userData.typing, typeof userData.typing);
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
    }, 1000);
    this.scrollToTop();
  }

  scrollToTop(): void {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  }

  createMessageId(): void {
    if (this.user) {
      const myEmail = this.user.email || "";
      this.reciverEmail =
        this.contactList[parseInt(this.$route.params.id)].email || "";
      this.messageId =
        myEmail > this.reciverEmail
          ? `${myEmail}-${this.reciverEmail}`
          : `${this.reciverEmail}-${myEmail}`;
    }
  }

  created(): void {
    const chatMessages: any = document.querySelector(".personal-chat-app");
    setTimeout(() => {
      this.createMessageId();
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.personal-chat-app {
  .messages {
    min-height: 100%;
  }
  .typing-message {
    margin-bottom: 5rem;
  }
}
</style>
