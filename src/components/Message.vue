<template>
  <div class="message-text">
    <a
      :href="linkPreviews[0].href"
      target="_blank"
      v-if="linkPreviews"
      class="preview-link mb-2"
    >
      <img
        :src="favicon || 'http://localhost:8080/favicon.ico'"
        class="link-image"
        alt="fevicon"
      />
      <p class="link-text">
        {{ urlPageTitle }}
      </p>
    </a>
    <p ref="chatMessage" class="chat-message"></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as linkify from "linkifyjs";
import linkifyStr from "linkifyjs/string";
import { Preview } from "@/types/interface";

@Component
export default class Message extends Vue {
  @Prop({ required: true }) message!: string;
  linkPreviews: Preview[] | undefined;
  parsedMessage!: string;
  urlPageTitle = "";

  mounted(): void {
    this.parsedMessage = linkifyStr(this.message, {
      className: "chat-link",
      defaultProtocol: "https",
    });
    const el = this.$refs.chatMessage as Element;
    el.innerHTML = this.parsedMessage;
  }

  get favicon(): string {
    const link = this.linkPreviews ? this.linkPreviews[0].href : undefined;
    let iconURL = `https://www.google.com/s2/favicons?sz=256&domain=${link}`;
    this.urlPageTitle = `${link}`;
    return iconURL;
  }

  created(): void {
    const links = linkify.find(this.message);
    this.linkPreviews = links.length > 0 ? links : undefined;
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0 !important;
}
.message-text {
  max-width: 20rem;
  word-break: break-all;

  a {
    text-decoration: none;
  }
  .preview-link {
    max-width: 18rem;
    display: flex;
    background: #bb96ffd0;
    justify-content: flex-start;
    padding: 0.5rem;

    .link-image {
      border-radius: 0;
      width: 20%;
      height: 10%;
    }
    .link-text {
      padding-left: 1rem;
      color: black;
      font-weight: bold;
    }
  }
}
</style>
