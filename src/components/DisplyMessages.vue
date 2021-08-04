<template>
  <div class="display-message">
    <div
      v-for="(msg, index) in allMessages"
      :key="index"
      :class="msg.userUID === user.uid ? 'my-message' : ''"
      class="message"
    >
      <div class="user-message">
        <div class="message-content">
          <!-- <span v-if="msg.userUID !== user.uid" class="msg-email">{{
              msg.email
            }}</span> -->
          <Message :message="msg.text" />

          <div class="d-flex msg-date-time pt-4">
            <!-- <span class="msg-date mr-1">{{ getDate(msg.createdAt) }}</span> -->
            <span class="msg-time ml-auto">{{ getTime(msg.createdAt) }}</span>
          </div>
        </div>
        <!-- <div class="user-pic" v-if="!imageLoading">
          <v-list-item-avatar class="img" v-if="reciverPic || senderPic">
            <v-img
              :src="
                msg.userUID !== user.uid
                  ? senderPic || '/assets/user.png'
                  : reciverPic || '/assets/user.png'
              "
              :alt="msg.displayName"
            ></v-img>
          </v-list-item-avatar>
          <div
            v-else
            class="alt-profile-pic img mr-2"
            :style="{
              background: getColor(msg.email.length),
            }"
          >
            <span>{{ msg.email.slice(0, 2) }}</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/types/types";
import Message from "@/components/Message.vue";
import MessageSender from "@/components/MessageSender.vue";
import { ContactList } from "@/types/interface";

const contact = namespace("Contacts");
const user = namespace("User");

@Component({
  components: {
    Message,
    MessageSender,
  },
})
export default class DisplyMessages extends Vue {
  user = firebase.auth().currentUser;
  db = firebase.firestore();
  allMessages: Message[] = [];
  reciverPic = "";
  senderPic = "";
  colorList = ["#a1f5c17c", "#cba9f37c", "#f7adf77c", "#e7a7817c", "#b5eeba7c"];
  imageLoading = false;

  @Prop({ default: "" }) messageId!: string;
  @Prop({ default: "" }) reciverEmail!: string;

  @contact.Getter("loadContacts")
  public contactList!: ContactList[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  sentOrReceived(userUID: string): string {
    return userUID === this.user?.uid ? "sent" : "received";
  }

  getColor(num: number): string {
    return this.colorList[num % 5];
  }

  getDate(timestamp: number): string {
    return new Date(timestamp).toString().slice(4, 15);
  }

  getTime(timestamp: number): string {
    return new Date(timestamp).toString().slice(15, 21);
  }

  getMessages(): void {
    setTimeout(() => {
      if (this.user) {
        this.db
          .collection(this.messageId)
          .orderBy("createdAt")
          .onSnapshot((querySnap) => {
            this.allMessages = querySnap.docs.map((doc) =>
              doc.data()
            ) as Message[];
            this.$nextTick(function () {
              const chatMessages: any =
                // document.querySelector(".display-message");
                this.$emit("scrollPage");
              // chatMessages.scrollTop = chatMessages.scrollHeight;
            });
          });
        this.getDownloadUrl(this.user.email as string, "sender");
        this.getDownloadUrl(this.reciverEmail as string, "reciver");
      }
    }, 1000);
  }

  getDownloadUrl(userEmail: string, userType: string): void {
    this.imageLoading = true;
    this.getProfilePic(userEmail)
      .then((res: string) => {
        if (userType === "sender") {
          this.reciverPic = res;
        } else {
          this.senderPic = res;
        }
        this.imageLoading = false;
      })
      .catch(() => {
        if (userType === "sender") {
          this.senderPic = "/assets/user.png";
        } else {
          this.reciverPic = "/assets/user.png";
        }
        this.imageLoading = false;
      });
  }

  created(): void {
    this.getMessages();
  }
}
</script>

<style lang="scss" scoped>
.display-message {
  margin-bottom: 2rem;
  .message,
  .my-message {
    display: flex;
    align-items: center;
    padding-top: 0.5rem;

    img {
      border-radius: 50%;
      width: 2.2rem;
    }
    .user-message {
      display: flex;
      flex-direction: column;
      .message-content {
        margin-left: 0rem;
        margin-top: 1rem;
        padding: 0rem 0.4rem 0rem 0.5rem;
        background: rgb(212, 223, 245);
        border-radius: 0.5rem;
        color: rgb(50, 4, 95);
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        font-weight: bold;
        word-break: break-all;
        font-size: 0.8rem;

        .msg-email {
          font-size: 0.8rem;
          font-weight: normal;
        }
      }
      .msg-date-time {
        order: 2;
        font-size: 0.8rem;
        padding: 0.5rem 0rem;
        color: rgb(149, 90, 226);
      }

      .user-pic {
        align-self: flex-start;
      }
    }
  }

  .my-message {
    justify-content: flex-end;
    .message-content {
      margin-right: 0.5rem;
      background: rgb(215, 243, 206);
    }
    .user-pic {
      align-self: flex-end !important;
    }
  }

  .alt-profile-pic {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    padding: 1.15rem;
    font-weight: bold;
    color: rgb(2, 2, 2);
  }
}
</style>
