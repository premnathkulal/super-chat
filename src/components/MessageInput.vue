<template>
  <div class="message-input">
    <VEmojiPicker
      v-if="showEmojies"
      :emoji-size="28"
      :emojis-by-row="8"
      @select="selectEmoji"
      :emojiWithBorder="false"
    />
    <div class="input-area">
      <div class="input-box">
        <i class="fa fa-smile-o" @click="showEmojies = !showEmojies"></i>
        <input
          v-model="message"
          type="text"
          class="text-box"
          placeholder="Search..."
        />
        <i class="fa fa-paperclip"></i>
        <i class="fa fa-camera"></i>
        <i v-if="!message" class="fa fa-paper-plane"></i>
      </div>
      <div class="mic-icon">
        <i v-if="!message" class="fa fa-microphone fa-icon"></i>
        <i v-if="message" class="fa fa-paper-plane fa-icon"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { VEmojiPicker } from "v-emoji-picker";
import { Emoji } from "v-emoji-picker/lib/models/Emoji";
import { Vue, Component, Prop } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { SocketActions } from "@/types/types";

const socket = namespace("Socket");

@Component({
  components: {
    VEmojiPicker,
  },
})
export default class MessageInput extends Vue {
  user = firebase.auth().currentUser;
  db = firebase.firestore();
  showEmojies = false;
  message = "";

  @Prop({ default: "" }) messageId!: string;

  @socket.Action(SocketActions.STARTED_TYPING)
  public userTyping!: (email: string) => void;

  async sendMessage(): Promise<void> {
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
      this.showEmojies = false;
    }
  }

  selectEmoji(emoji: Emoji): void {
    this.message = this.message + emoji.data;
  }

  messageTyping(): void {
    if (this.user) {
      this.userTyping(this.user.email as string);
    }
  }

  created(): void {
    //
  }
}
</script>

<style lang="scss">
.input-area {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .input-box {
    display: flex;
    flex: 1;
    align-items: center;
    background: white;
    padding: 0.4rem 0.5rem;
    border-radius: 5rem;
    box-shadow: 5px 7px 32px rgb(153, 149, 149);

    .text-box {
      border: none;
      box-shadow: none;
      outline: none;
      flex: 1;
      width: 50px;
    }

    .fa {
      cursor: pointer;
      font-weight: bold;
      padding: 0 0.3rem;
      font-size: 1.2rem;
    }
    .fa-smile-o {
      padding-right: 0.5rem;
      font-size: 1.5rem;
    }
  }
  .mic-icon {
    cursor: pointer;
    padding: 0.1rem;
    padding-top: 0.1rem;
    .fa-icon {
      border-radius: 50%;
      padding-left: 0.5rem;
      color: #30224b;
      font-size: 1.3rem;
    }
  }
}

#EmojiPicker {
  display: block;
  width: 100%;
  margin-bottom: -0.75rem;
  transition: 0.2s;
  #Emojis {
    .container-emoji {
      height: 10rem;
    }
  }
}
</style>
