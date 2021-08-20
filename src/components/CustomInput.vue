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
        @input="$emit('input', $event.target.value)"
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
import { Vue, Component, Prop } from "vue-property-decorator";
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

  selectEmoji(emoji: Emoji): void {
    this.$emit("input", emoji.data.toString());
    // console.log(emoji.data);
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
