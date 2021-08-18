<template>
  <div class="create-room">
    <div class="create">
      <div class="toggle-btn">
        <div
          class="button"
          :class="{ active: !createGroupTab }"
          @click="createGroupTab = false"
        >
          Add New Contact
        </div>
        <div
          class="button"
          :class="{ active: createGroupTab }"
          @click="createGroupTab = true"
        >
          Create New Group
        </div>
      </div>
      <div class="input-form">
        <VEmojiPicker
          v-if="showEmojies"
          :emoji-size="28"
          :emojis-by-row="8"
          @select="selectEmoji"
          :emojiWithBorder="false"
        />
        <div class="input-area">
          <div class="input-box">
            <input
              type="text"
              class="text-box"
              :placeholder="`Enter ${
                createGroupTab ? 'Group Name' : 'User Name'
              }`"
            />
            <i
              v-if="createGroupTab"
              class="fa fa-smile-o"
              @click.stop="showEmojies = !showEmojies"
            ></i>
          </div>
        </div>
        <button class="submit-button">Create</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { VEmojiPicker } from "v-emoji-picker";
import { Emoji } from "v-emoji-picker/lib/models/Emoji";

@Component({
  components: {
    VEmojiPicker,
  },
})
export default class CreateRoom extends Vue {
  showEmojies = false;
  createGroupTab = false;

  selectEmoji(emoji: Emoji): void {
    //
  }
}
</script>

<style lang="scss" scoped>
.create-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8% 0;
  overflow-y: scroll;
  height: 100vh;

  .create {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #e9e2f7;

    width: 65%;
    @media only screen and (max-width: 500px) {
      width: 95%;
    }

    .toggle-btn {
      cursor: pointer;
      display: flex;
      width: 100%;

      .button {
        flex: 1;
        padding: 0.8rem;
        background: #30224b;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        text-align: center;
      }
      .active {
        background: #9874df;
      }
    }

    .input-form {
      width: 100%;
      margin-top: 2rem;
      display: flex;
      flex-direction: column;

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
          box-shadow: 0px 0px 0px rgb(153, 149, 149);
          border-radius: 0%;

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
      }
      .submit-button {
        background: #30224b;
        color: white;
        text-align: center;
        font-weight: bold;
        margin: 1rem;
        padding: 0.4rem 0.5rem;
        cursor: pointer;
        box-shadow: none;
        outline: none;
        border: none;
        box-shadow: 0px 0px 0px rgb(153, 149, 149);
      }
    }
  }
}
</style>
