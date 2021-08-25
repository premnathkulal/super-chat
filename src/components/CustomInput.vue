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
        id="text-box"
        type="text"
        class="text-box"
        :placeholder="placeholder"
        :value="value"
        @input="inputAction"
        @blur="$emit('blurAction')"
        @keypress="$emit('keypressAction')"
        @click="getCursorPosition()"
      />
      <font-awesome-icon
        v-if="showEmojiPicker"
        icon="smile"
        class="fa"
        @click.stop="showEmojies = !showEmojies"
      />
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
  curPos = 0;

  @Watch("value")
  getCursorPosition(): void {
    const el = this.getTextBox();
    this.curPos = el.selectionStart || 0;
  }

  getTextBox(): HTMLInputElement {
    const element = document.getElementById("text-box");
    const el = element as HTMLInputElement;
    return el;
  }

  inputAction(event: KeyboardEvent): void {
    const evt = event.target as HTMLTextAreaElement;
    if (evt.value) {
      this.$emit("input", evt.value);
      return;
    }
  }

  typeInTextarea(emoji: string) {
    const el = this.getTextBox();
    el.value =
      el.value.slice(0, this.curPos) + emoji + el.value.slice(this.curPos);
    this.curPos += emoji.length;
  }

  selectEmoji(emoji: Emoji): void {
    this.typeInTextarea(emoji.data);
  }

  created(): void {
    //
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
      padding: 0;
      padding-left: 0.5rem;
      font-size: 1.2rem;
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
