<template>
  <div class="display-message" ref="scrollToMe">
    <div
      v-for="(msg, index) in personal[0].messages"
      :key="index"
      :class="'navin123' === msg.from ? 'my-message' : ''"
      class="message"
      @up="prems()"
    >
      <div class="user-pic" v-if="index < personal[0].messages.length">
        <div
          v-if="
            index + 1 === personal[0].messages.length ||
            msg.from !== personal[0].messages[index + 1].from
          "
        >
          <img
            class="img"
            :src="`https://avatars.dicebear.com/api/avataaars/${msg.from}.svg`"
          />
        </div>
      </div>
      <div class="message-contents">
        <!-- <div class="user-name">{{ msg.from }}</div> -->
        <!-- <div class="message">{{ msg.message }}</div> -->
        <message :message="msg.message" />
        <div class="time">{{ "10:00AM" }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/types/types";
import Message from "@/components/Message.vue";
import MessageSender from "@/components/MessageInput.vue";
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
  imageLoading = false;
  personal = [
    {
      id: "messageID_1",
      messageId: "navin123-pramod456",
      category: "personal",
      messages: [
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "lets start",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Hello. Pramod",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Hello. Navin",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Hope you are doing well",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Yeah",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "How r u Navin?",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "I saw u near the park today morning",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Oh I just went for quick walk",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "From tomorrow I'll join you",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Yeah, sure Pramod",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "I saw u near the park today morning",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Oh I just went for quick walk",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "From tomorrow I'll join you",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Yeah, sure Pramod",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "I saw u near the park today morning",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Oh I just went for quick walk",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "From tomorrow I'll join you",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Yeah, sure Pramod",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "I saw u near the park today morning",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Oh I just went for quick walk",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "From tomorrow I'll join you",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Yeah, sure Pramod",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "I saw u near the park today morning",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Oh I just went for quick walk",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "From tomorrow I'll join you",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Yeah, sure Pramod",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "I saw u near the park today morning",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "Oh I just went for quick walk",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "https://upstox.com/",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message: "https://twitter.com/youyuxi",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "https://www.whatsapp.com",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message:
            "https://v3.vuejs.org/guide/composition-api-introduction.html#standalone-computed-properties",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "From tomorrow I'll join you",
        },
        {
          from: "pramod456",
          top: "navin123",
          time: "Tue Aug 17 2021 17:37:51",
          message: "https://www.facebook.com/ Please like share and subscribe",
        },
        {
          from: "navin123",
          top: "pramod456",
          time: "Tue Aug 17 2021 17:37:51",
          message:
            "https://www.youtube.com/watch?v=6GA6X8XHE14 Please like share and subscribe",
        },
      ],
    },
  ];

  @Prop({ default: "" }) messageId!: string;
  @Prop({ default: "" }) reciverEmail!: string;

  @contact.Getter("loadContacts")
  public contactList!: ContactList[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  sentOrReceived(userUID: string): string {
    return userUID === this.user?.uid ? "sent" : "received";
  }

  getDate(timestamp: number): string {
    return new Date(timestamp).toString().slice(4, 15);
  }

  getTime(timestamp: number): string {
    return new Date(timestamp).toString().slice(15, 21);
  }

  // getMessages(): void {
  //   setTimeout(() => {
  //     if (this.user) {
  //       this.db
  //         .collection(this.messageId)
  //         .orderBy("createdAt")
  //         .onSnapshot((querySnap) => {
  //           this.allMessages = querySnap.docs.map((doc) =>
  //             doc.data()
  //           ) as Message[];
  //           this.$nextTick(function () {
  //             const chatMessages: any =
  //               // document.querySelector(".display-message");
  //               this.$emit("scrollPage");
  //             // chatMessages.scrollTop = chatMessages.scrollHeight;
  //           });
  //         });
  //       this.getDownloadUrl(this.user.email as string, "sender");
  //       this.getDownloadUrl(this.reciverEmail as string, "reciver");
  //     }
  //   }, 1000);
  // }

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

  windowScroll(): void {
    const element: any = this.$refs.scrollToMe;
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }

  mounted(): void {
    this.windowScroll();
  }

  created(): void {
    //
  }
}
</script>

<style lang="scss" scoped>
.display-message {
  margin: 1rem 0.4rem;
  .message,
  .my-message {
    display: flex;
    align-items: flex-end;

    .message-contents {
      margin-top: 0.5rem;
      padding: 0.2rem 0.5rem;
      background: #6e4ead;
      color: white;
      border-radius: 0.3rem;
      max-width: 18rem;

      .user-name {
        font-weight: bold;
      }
      .time {
        font-size: 0.6rem;
        text-align: right;
      }
    }

    .user-pic {
      height: 2rem;
      width: 2rem;
      margin-right: 0.5rem;

      .img {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
      }
    }
  }

  .my-message {
    justify-content: flex-end;

    .message-contents {
      margin-top: 0.5rem;
      padding: 0.4rem;
      background: #d8ceec;
      color: rgb(53, 51, 51);
      border-radius: 0.3rem;
      order: 1;

      .user-name {
        display: none;
      }
    }
    .user-pic {
      order: 2;
      margin-right: 0rem;
      margin-left: 0.5rem;
    }
  }
}
</style>