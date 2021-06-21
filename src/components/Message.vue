<template>
  <div class="message">
    <div>
      <a
        :href="previews[0].href"
        target="_blank"
        v-if="previews"
        class="preview-link mb-2"
      >
        <img
          :src="favicon || 'http://localhost:8080/favicon.ico'"
          class="link-image"
          alt="fevicon"
        />
        <p class="link-text pl-2">{{ previews[0].href.slice(0, 50) }}</p>
      </a>
      <p ref="chatMessage" class="chat-message"></p>
    </div>
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
  previews: Preview[] | undefined;
  parsedMessage!: string;

  mounted(): void {
    this.parsedMessage = linkifyStr(this.message, {
      className: "chat-link",
      defaultProtocol: "https",
    });
    const el = this.$refs.chatMessage as Element;
    el.innerHTML = this.parsedMessage;
  }

  get favicon(): string {
    const link = this.previews ? this.previews[0].href : undefined;
    let iconURL = `http://${link?.split("/")[2].split("?")[0]}/favicon.ico`;
    // try {
    //   //  fetch(iconURL);
    // } catch (e) {
    //   iconURL =
    //     "https://cdn0.iconfinder.com/data/icons/document-file-types/512/url-512.png";
    // }
    return iconURL;
  }

  created(): void {
    const links = linkify.find(this.message);
    this.previews = links.length > 0 ? links : undefined;
    console.log(this.previews);
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0 !important;
}
.message {
  max-width: 20rem;
  .preview-link {
    max-width: 20rem;
    max-height: 8rem;
    overflow: hidden;
    display: flex;
    background: #ffffff65;
    justify-content: flex-start;

    .link-image {
      border-radius: 0;
      width: 4rem;
    }
  }
}
</style>
