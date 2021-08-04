<template>
  <div v-if="user" class="chat-app container">
    <div class="display-message">
      <div
        v-for="(msg, index) in allMessages"
        :key="index"
        :class="msg.userUID === user.uid ? 'my-message' : ''"
        class="message"
      >
        <img
          v-if="msg.photoURL"
          class="img"
          :src="msg.photoURL"
          :alt="msg.displayName"
        />
        <div
          v-else
          class="alt-profile-pic img"
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

@Component
export default class ChatApp extends Vue {
  user = firebase.auth().currentUser;
  message = "";
  db = firebase.firestore();
  allMessages: any = [];
  colorList = ["#a1f5c17c", "#cba9f37c", "#f7adf77c", "#e7a7817c", "#b5eeba7c"];

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
    await this.db.collection("pool-chats").add(messageInfo);
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
    this.db
      .collection("pool-chats")
      .orderBy("createdAt")
      .onSnapshot((querySnap) => {
        this.allMessages = querySnap.docs.map((doc) => doc.data());
      });
    this.scrollPage();
  }

  updated() {
    this.scrollPage();
  }
}
</script>

<style lang="scss">
.chat-app {
  min-height: 15rem;
  margin-bottom: 7rem;

  .display-message {
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
          margin-left: 0.5rem;
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
