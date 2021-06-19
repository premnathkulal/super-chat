<template>
  <div v-if="user" class="chat-app container">
    <div class="display-message">
      <div
        v-for="(msg, index) in allMessages"
        :key="index"
        :class="msg.userUID === user.uid ? 'my-message' : ''"
        class="message"
      >
        <v-list-item-avatar class="img" v-if="reciverPic || senderPic">
          <v-img
            :src="
              msg.userUID === user.uid
                ? senderPic
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
        <div class="user-message">
          <p class="message-content">
            <span v-if="msg.userUID !== user.uid" class="msg-email">{{
              msg.email
            }}</span
            >{{ msg.text }}
          </p>
          <div class="d-flex msg-date-time">
            <span class="msg-date mr-1">{{ getDate(msg.createdAt) }}</span>
            <span class="msg-time ml-auto">{{ getTime(msg.createdAt) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="input-div">
      <div class="container">
        <form @submit.prevent="sendMessage" class="form">
          <input
            v-model="message"
            type="text"
            placeholder="Enter your message!"
            class="form-control"
          />
          <button :disabled="!message" type="submit" class="btn button">
            <i class="fa fa-send"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/utils/types";

const contact = namespace("Contacts");
const user = namespace("User");

@Component
export default class PersonalChat extends Vue {
  user = firebase.auth().currentUser;
  message = "";
  db = firebase.firestore();
  allMessages: any = [];
  messageId = "";
  reciverPic = "";
  senderPic = "";
  colorList = ["#a1f5c17c", "#cba9f37c", "#f7adf77c", "#e7a7817c", "#b5eeba7c"];

  @contact.Getter("loadContacts")
  public contactList!: any[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  sentOrReceived(userUID: string): string {
    return userUID === this.user?.uid ? "sent" : "received";
  }

  async sendMessage() {
    const messageInfo = {
      email: this.user?.email,
      userUID: this.user?.uid,
      displayName: this.user?.displayName,
      photoURL: this.user?.photoURL,
      text: this.message,
      createdAt: Date.now(),
    };
    await this.db.collection(this.messageId).add(messageInfo);
    this.message = "";
  }

  scrollPage(): void {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
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

  created() {
    setTimeout(() => {
      if (this.user) {
        const myEmail = this.user.email || "";
        const reciverEmail =
          this.contactList[parseInt(this.$route.params.id)].email || "";
        this.messageId =
          myEmail > reciverEmail
            ? myEmail + "-" + reciverEmail
            : reciverEmail + "-" + myEmail;

        this.db
          .collection(this.messageId)
          .orderBy("createdAt")
          .onSnapshot((querySnap) => {
            this.allMessages = querySnap.docs.map((doc) => doc.data());
          });
        this.getDownloadUrl(this.user.email as string, "sender");
        this.getDownloadUrl(reciverEmail as string, "reciver");
        this.scrollPage();
      }
    }, 1000);
  }

  updated() {
    this.scrollPage();
  }

  getDownloadUrl(userEmail: string, userType: string): void {
    this.getProfilePic(userEmail)
      .then((res: string) => {
        if (userType === "sender") {
          this.reciverPic = res;
        } else {
          this.senderPic = res;
        }
      })
      .catch((error) => {
        this.reciverPic = "/assets/user.png";
      });
  }
}
</script>

<style lang="scss" scoped>
.chat-app {
  min-height: 15rem;
  margin-bottom: 7rem;

  .display-message {
    margin-top: 0rem;
    .message,
    .my-message {
      display: flex;
      align-items: center;
      padding-top: 1rem;
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
          padding: 0.2rem 1rem 0.2rem 1rem;
          background: rgb(212, 223, 245);
          border-radius: 0.5rem;
          color: rgb(50, 4, 95);
          display: flex;
          flex-direction: column;
          font-size: 1rem;
          font-weight: bold;

          .msg-email {
            font-size: 0.8rem;
            font-weight: normal;
          }
        }
        .msg-date-time {
          margin-top: -0.9rem;
          order: 2;
          font-size: 0.8rem;
        }
      }
    }

    .my-message {
      justify-content: flex-end;
      .img {
        order: 2;
      }
      .message-content {
        margin-right: 0.5rem;
        background: rgb(215, 243, 206);
        order: 1;
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

  .input-div {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    background: white;
    form {
      position: sticky;
      bottom: 0;
      top: 0;
      display: flex;
      background: white;
      left: 0;
      input {
        box-shadow: none;
      }
    }
  }
  .fa {
    color: rgb(50, 4, 95);
  }
}
</style>
