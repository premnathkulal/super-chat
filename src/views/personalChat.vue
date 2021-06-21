<template>
  <div v-if="user" class="container personal-chat-app">
    <div class="messages">
      <DisplyMessages
        :messageId="messageId"
        :reciverEmail="reciverEmail"
        @scrollPage="scrollPage"
      />
    </div>
    <v-footer>
      <MessageSender :messageId="messageId" />
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/types/types";
import Message from "@/components/Message.vue";
import MessageSender from "@/components/MessageSender.vue";
import DisplyMessages from "@/components/DisplyMessages.vue";
import { ContactList } from "@/types/interface";

const contact = namespace("Contacts");
const user = namespace("User");

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

  @contact.Getter("loadContacts")
  public contactList!: ContactList[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  scrollPage(): void {
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
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
