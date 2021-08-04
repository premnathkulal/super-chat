<template>
  <div class="input-div">
    <div>
      <VEmojiPicker
        v-if="showEmojies"
        :emoji-size="28"
        :emojis-by-row="8"
        @select="selectEmoji"
        :emojiWithBorder="false"
      />
    </div>
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
          prepend-icon="mdi-emoticon"
          append-outer-icon="mdi-send"
          @click:prepend="showEmojies = !showEmojies"
          @click:append-outer="sendMessage"
          @keypress.prevent.enter="sendMessage"
          @input="messageTyping()"
        ></v-textarea>
      </form>
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
export default class MessageSender extends Vue {
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
}
</script>

<style lang="scss">
.input-div {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
}

#EmojiPicker {
  display: block;
  width: 100%;
  margin-bottom: -0.75rem;
  transition: 0.2s;
  #Emojis {
    .container-emoji {
      height: 11rem;
    }
  }
}
</style>
