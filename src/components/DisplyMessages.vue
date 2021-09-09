<template>
  <div class="display-message" ref="scrollToMe">
    <template v-if="chatData">
      <template v-for="(msg, index) in chatMessages">
        <div
          v-if="
            index === 0 ||
            msg.time.slice(0, 15) !== chatMessages[index - 1].time.slice(0, 15)
          "
          :key="index"
          class="message-date"
        >
          <span class="date-text">{{ msg.time | timeDate('date') }}</span>
        </div>
        <div
          :key="`${index}-${chatId}`"
          :class="userInfo.email === msg.sender ? 'my-message' : ''"
          class="message"
        >
          <div class="user-pic" v-if="index < chatMessages.length">
            <div
              v-if="
                index + 1 === chatMessages.length ||
                msg.sender !== chatMessages[index + 1].sender
              "
            >
              <img
                class="img"
                :src="`https://avatars.dicebear.com/api/avataaars/${msg.sender}.svg`"
                alt="user-img"
              />
            </div>
          </div>
          <div class="message-contents">
            <div class="user-name">{{ msg.name }}</div>
            <message :message="msg.message" @windowScroll="windowScroll" />
            <div class="time">{{ msg.time | timeDate('time') }}</div>
          </div>
        </div>
      </template>
    </template>
    <div v-else class="emty-field">
      <lottie-player
        autoplay
        loop
        mode="normal"
        style="width: 220px; height: 200px"
        src="/assets/lovely-cats.json"
        background="transperant"
      >
      </lottie-player>
      No Chats Found
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Message from '@/components/Message.vue';
import { namespace } from 'vuex-class';
import { ChatActions } from '@/types/types';

const chat = namespace('Chat');
const user = namespace('User');

@Component({
  components: {
    Message,
  },
})
export default class DisplyMessages extends Vue {
  chatMessages: any = [];
  chatId = '';

  @user.Getter
  public userInfo!: any;

  @chat.Getter
  isLoading!: boolean;

  @chat.Getter
  chatData!: any;

  @chat.Action(ChatActions.LOAD_CHAT)
  public loadChatData!: (id: string) => any;

  @Watch('isLoading')
  windowScroll(): void {
    const element = this.$refs.scrollToMe as HTMLElement;
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }

  @Watch('chatData')
  setMessages(): void {
    this.chatMessages = [];
    if (this.chatData) {
      this.chatMessages.push(...this.chatData.messages);
      this.chatId = this.chatData.roomId;
    }
  }

  mounted(): void {
    this.windowScroll();
  }
}
</script>

<style lang="scss" scoped>
.display-message {
  .message-date {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    font-size: 0.8rem;

    .date-text {
      background: #e7eff8;
      padding: 0.3rem;
    }
  }

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
      background: #6e4ead4d;
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

  .emty-field {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 60vh;
  }
}
</style>
