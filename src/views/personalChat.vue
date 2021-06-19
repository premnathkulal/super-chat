<template>
  <div v-if="user" class="container chat-app">
    <div @click="showEmojies = false" class="display-message">
      <div
        v-for="(msg, index) in allMessages"
        :key="index"
        :class="msg.userUID === user.uid ? 'my-message' : ''"
        class="message"
      >
        <!-- <v-list-item-avatar class="img" v-if="reciverPic || senderPic">
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
        </div> -->
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
        </div>
      </div>
    </div>
    <v-footer>
      <div class="input-div">
        <div class="container">
          <form @submit.prevent="sendMessage" class="form">
            <v-textarea
              v-model="message"
              class="input-box"
              color="secondary lighten-1"
              height="10"
              no-resize
              full-width
              solo
              dense
              rounded
              hide-details
              type="text"
              label="Enter your message !"
              clearable
              clear-icon="mdi-close-circle"
              append-outer-icon="mdi-send"
              @click:append-outer="sendMessage"
              @keypress.prevent.enter="sendMessage"
            ></v-textarea>
          </form>
        </div>
      </div>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/utils/types";
import { Emoji } from "v-emoji-picker/lib/models/Emoji";
import * as linkify from "linkifyjs";
import linkifyStr from "linkifyjs/string";
import Message from "@/components/Message.vue";

const contact = namespace("Contacts");
const user = namespace("User");

@Component({
  components: {
    Message,
  },
})
export default class PersonalChat extends Vue {
  user = firebase.auth().currentUser;
  message = "";
  db = firebase.firestore();
  allMessages: any = [];
  messageId = "";
  reciverPic = "";
  senderPic = "";
  colorList = ["#a1f5c17c", "#cba9f37c", "#f7adf77c", "#e7a7817c", "#b5eeba7c"];
  previews: any[] | undefined;
  parsedMessage!: string;

  @contact.Getter("loadContacts")
  public contactList!: any[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  sentOrReceived(userUID: string): string {
    return userUID === this.user?.uid ? "sent" : "received";
  }

  async sendMessage() {
    if (this.message) {
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

  selectEmoji(emoji: Emoji): void {
    this.message = this.message + emoji.data;
  }

  mounted(): void {
    this.parsedMessage = linkifyStr("this.message.content", {
      className: "chat-link",
      defaultProtocol: "https",
    });
    // const el = this.$refs.chatMessage as Element;
    // el.innerHTML = this.parsedMessage;
  }

  getLinks(msg: string) {
    const links = linkify.find(msg);
    this.previews = links.length > 0 ? links : undefined;
  }

  get favicon(): string {
    const link = this.previews ? this.previews[0].href : undefined;
    let iconURL = `http://${link?.split("/")[2].split("?")[0]}/favicon.ico`;
    try {
      fetch(iconURL);
    } catch (e) {
      iconURL =
        "https://cdn0.iconfinder.com/data/icons/document-file-types/512/url-512.png";
    }
    return iconURL;
  }
  get isSocialLink(): boolean {
    const link = this.previews ? this.previews[0].href : null;
    if (link) {
      return (
        link.includes("instagram") ||
        link.includes("fb") ||
        link.includes("facebook") ||
        link.includes("youtube") ||
        link.includes("twitter") ||
        link.includes("t.me") ||
        link.includes(".mp4") ||
        link.includes("image")
      );
    }
    return false;
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
        // console.log(res);
      })
      .catch((error) => {
        if (userType === "sender") {
          this.senderPic = "/assets/user.png";
        } else {
          this.reciverPic = "/assets/user.png";
        }
      });
  }
}
</script>

<style lang="scss" scoped>
.chat-app {
  min-height: 100%;
  margin-bottom: 7rem;

  .display-message {
    margin-top: 0rem;
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
  }
}

#EmojiPicker {
  display: block;
  width: 100%;
  padding-top: 5px;
  transition: 0.2s;
  #Emojis {
    height: 1rem !important;
    .container-emoji {
      height: 1rem !important;
    }
  }
}

.grid-emojis {
  height: 1rem !important;
}

.prem {
  margin-bottom: 0rem !important;
}
</style>
