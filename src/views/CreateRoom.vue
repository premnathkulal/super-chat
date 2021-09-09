<template>
  <div class="create-room">
    <div class="create">
      <div class="toggle-btn">
        <div
          class="button"
          :class="{ active: !createGroupTab }"
          @click="toggleTab()"
        >
          Add New Contact
        </div>
        <div
          class="button"
          :class="{ active: createGroupTab }"
          @click="toggleTab()"
        >
          Create New Group
        </div>
      </div>
      <div class="input-form">
        <div class="input-area">
          <custom-input
            v-if="!createGroupTab"
            class="input-component"
            placeholder="Email"
            v-model="email"
            :value="email"
            :errorMessage="emailError"
            @blurAction="validateEmail()"
            @keypressAction="emailError = ''"
          />
          <custom-input
            v-if="createGroupTab"
            class="input-component"
            placeholder="Group Name"
            v-model="name"
            :value="name"
            :errorMessage="nameError"
            :showEmojiPicker="showEmojiPicker"
            @blurAction="validateName()"
            @keypressAction="nameError = ''"
            @setEmoji="setEmoji"
          />
        </div>
        <custom-button btnName="Create" @btnAction="buttonAction()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import { namespace } from 'vuex-class';
import { ContactActions } from '@/types/types';

const contacts = namespace('Contacts');

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class CreateRoom extends Vue {
  createGroupTab = false;
  showEmojiPicker = false;
  email = '';
  emailError = '';
  name = '';
  nameError = '';

  @contacts.Action(ContactActions.CREATE_GROUP)
  public createGroup!: (data: {
    groupName: string;
    groupOwners: string[];
  }) => void;

  clearForm(): void {
    this.name = '';
    this.email = '';
    this.nameError = '';
    this.emailError = '';
  }

  toggleTab(): void {
    this.clearForm();
    this.createGroupTab = !this.createGroupTab;
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  validateEmail(): void {
    this.emailError = '';
    // eslint-disable-next-line
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email) {
      this.emailError = 'This field is Required';
    } else if (!re.test(this.email)) {
      this.emailError = 'Enter valid Email';
    }
  }

  validateName(): void {
    this.emailError = '';
    if (this.name.length < 4) {
      this.nameError = 'Name must be 4 character long';
    }
  }

  setEmoji(emoji: string): void {
    this.name += emoji;
  }

  buttonAction(): void {
    if (this.createGroupTab) {
      this.createGroup({ groupName: this.name, groupOwners: ['navin123'] });
    }
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
  height: 70vh;

  .create {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #e9e2f7;
    width: 550px;
    padding: 1.5rem;

    @media only screen and (max-width: 500px) {
      width: 80%;
    }

    .toggle-btn {
      cursor: pointer;
      display: flex;
      width: 100%;
      margin-bottom: 2rem;

      @media only screen and (max-width: 500px) {
        flex-direction: column;
      }

      .button {
        flex: 1;
        padding: 0.8rem;
        background: #9874df;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        text-align: center;
      }
      .active {
        background: #30224b;
      }
    }

    .input-form {
      width: 100%;
      display: flex;
      flex-direction: column;

      .input-area {
        padding: 0 0.5rem;
        display: flex;
        flex-direction: column;

        .input-component {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
