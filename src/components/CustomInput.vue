<template>
  <div class="custom-input">
    <VEmojiPicker
      v-if="showEmojies"
      :emoji-size="28"
      :emojis-by-row="8"
      @select="selectEmoji"
      :emojiWithBorder="false"
    />
    <div class="input-box">
      <input
        type="text"
        class="text-box"
        :placeholder="placeholder"
        :value="value"
        @input="inputAction"
        @blur="$emit('blurAction')"
        @keypress="$emit('keypressAction')"
      />
      <i
        v-if="showEmojiPicker"
        class="fa fa-smile-o"
        @click.stop="showEmojies = !showEmojies"
      ></i>
    </div>
    <p class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { VEmojiPicker } from "v-emoji-picker";
import { Emoji } from "v-emoji-picker/lib/models/Emoji";

const socket = namespace("Socket");

@Component({
  components: {
    VEmojiPicker,
  },
})
export default class CustomInput extends Vue {
  @Prop({ default: "" }) placeholder!: string;
  @Prop({ default: "" }) errorMessage!: string;
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) showEmojiPicker!: boolean;

  showEmojies = false;
  createGroupTab = false;

  inputAction(event: KeyboardEvent): void {
    const evt = event.target as HTMLTextAreaElement;
    if (evt.value) {
      this.$emit("input", evt.value);
      return;
    }
    // this.$emit("input", this.value + evt);
  }

  selectEmoji(emoji: Emoji): void {
    // let arrowRight = new KeyboardEvent("keydown", { key: 39 });
    // this.inputAction(arrowRight);
    // this.$emit("input", emoji.data);
    // // console.log(typeof emoji.data);
    // const event: Event = new Event("emoji-picker");
    // Object.defineProperty(event, "target", {
    //   writable: false,
    //   value: emoji.data,
    // });
    // // event.target = {this.value}
    // window.dispatchEvent(event);
    // this.inputAction(event as unknown as KeyboardEvent);
    this.$emit("setEmoji", emoji.data);
  }

  created(): void {
    // window.addEventListener(
    //   "emoji-picker",
    //   (e: any) => {
    //     this.inputAction(e as unknown as KeyboardEvent);
    //   },
    //   true
    // );
  }
}
</script>

<style lang="scss">
.custom-input {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .input-box {
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 0.5rem;
    box-shadow: 0px 0px 0px rgb(153, 149, 149);
    border-radius: 0%;
    height: 5rem;

    .text-box {
      border: none;
      box-shadow: none;
      outline: none;
      flex: 1;
      width: 50px;
      font-size: 1rem;
    }

    .fa {
      cursor: pointer;
      font-weight: bold;
      height: 1rem;
      margin-top: -0.5rem;
    }
    .fa-smile-o {
      padding: 0;
      padding-left: 0.5rem;
      font-size: 1.5rem;
    }
  }

  .error-message {
    padding: 0.5rem 0;
    text-align: left;
    align-self: flex-start;
    margin-left: -0.5rem;
    font-size: 0.8rem;
    color: red;
  }
}
</style>
