<template>
  <div class="message-input">
    <div class="message-input-container">
      <VEmojiPicker
        v-if="showEmojies"
        :emoji-size="28"
        :emojis-by-row="8"
        @select="selectEmoji"
        :emojiWithBorder="false"
      />
      <div class="input-area">
        <div class="message-input-box">
          <i></i>
          <font-awesome-icon
            icon="smile"
            class="fa"
            @click="showEmojies = !showEmojies"
          />
          <textarea
            id="text-box"
            v-model="message"
            rows="1"
            type="text"
            class="text-box"
            placeholder="Type a message..."
            @click="getCursorPosition()"
            @input="getCursorPositionWhileTyping"
          />
          <font-awesome-icon icon="paperclip" class="fa" />
          <font-awesome-icon icon="camera" class="fa" />
          <font-awesome-icon
            v-if="!message"
            @click="sendMessage()"
            icon="paper-plane"
            class="fa"
          />
        </div>
        <div class="mic-icon">
          <font-awesome-icon
            v-if="!message"
            icon="microphone"
            class="fa fa-icon"
          />
          <font-awesome-icon
            v-if="message"
            @click="sendMessage()"
            icon="paper-plane"
            class="fa fa-icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { VEmojiPicker } from "v-emoji-picker";
import { Emoji } from "v-emoji-picker/lib/models/Emoji";
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ChatActions, SocketActions } from "@/types/types";

const chat = namespace("Chat");
const socket = namespace("Socket");

@Component({
  components: {
    VEmojiPicker,
  },
})
export default class MessageInput extends Vue {
  showEmojies = false;
  message = "";
  curPos = 0;
  socket: any = null;

  @Prop({ default: "" }) messageId!: string;
  @Prop({ default: "" }) groupInfo!: {
    _id: string;
    groupName: string;
    groupOwners: string[];
  };

  @socket.Action(SocketActions.STARTED_TYPING)
  public userTyping!: (id: string) => void;

  @chat.Action(ChatActions.SEND_MESSAGE)
  public sendMessageToServer!: (payLoad: {
    message: string;
    roomId: string;
  }) => void;

  messageTyping(): void {
    console.log("typing...");
  }

  getTextBox(): HTMLInputElement {
    const element = document.getElementById("text-box");
    const el = element as HTMLInputElement;
    return el;
  }

  getCursorPosition(): void {
    const el = this.getTextBox();
    this.curPos = el.selectionStart || 0;
  }

  getCursorPositionWhileTyping($event: InputEvent): void {
    this.getCursorPosition();
  }

  typeInTextarea(emoji: string) {
    const el = this.getTextBox();
    el.value =
      el.value.slice(0, this.curPos) + emoji + el.value.slice(this.curPos);
    this.message = el.value;
    this.curPos += emoji.length;
  }

  selectEmoji(emoji: Emoji): void {
    this.typeInTextarea(emoji.data);
  }

  async sendMessage(): Promise<void> {
    this.sendMessageToServer({
      message: this.message,
      roomId: this.groupInfo._id,
    });
    if (this.message) {
      this.message = "";
      this.showEmojies = false;
    }
  }

  created(): void {
    //
  }
}
</script>

<style lang="scss" scoped>
.message-input {
  width: 100%;

  .message-input-container {
    padding: 0 2px;
    .input-area {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-around;

      .message-input-box {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        background: white;
        padding: 0.4rem 0.5rem;
        border-radius: 5rem;
        box-shadow: 5px 7px 32px rgb(153, 149, 149);

        .text-box {
          border: none;
          box-shadow: none;
          outline: none;
          flex: 1;
          height: 1.5rem;
          font-size: 1.1rem;
          // width: 50px;
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
  }
}
</style>
