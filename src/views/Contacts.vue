<template>
  <div class="container contacts">
    <div class="add-contact">
      <div @click="addContact = !addContact" class="add-icon-field">
        <v-icon class="add-icon">
          {{ !addContact ? "mdi-plus" : "mdi-close" }}
        </v-icon>
      </div>
      <span v-if="addContact">
        <v-text-field
          ref="name"
          v-model="name"
          label="name"
          placeholder="name"
        ></v-text-field
        ><v-text-field
          ref="email"
          v-model="email"
          :rules="[
            validateEmail(),
            !invalidEmail || 'Invalid Email',
            !emailExists || 'Email already exists',
          ]"
          label="Email"
          placeholder="Email"
          @keypress="
            invalidEmail = false;
            emailExists = false;
          "
        ></v-text-field>
        <div class="button-field">
          <v-btn
            class="mt-5 add-btn"
            color="primary"
            :disabled="emailErrors"
            @click="addToContactlist"
          >
            Add
          </v-btn>
          <v-btn class="mt-5 cancel-btn" @click="addContact = false">
            cancel
          </v-btn>
        </div>
      </span>
    </div>
    <div class="contacts-list mt-4">
      <template v-for="(contact, index) in allContactList">
        <v-list-item :key="index" @click="chatWithEmail(index)" class="contact">
          <v-list-item-avatar>
            <v-img
              v-if="!isLoading"
              :alt="`${contact.name} avatar`"
              :src="contact.picUrl || '/assets/user.png'"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="contact.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { ContactActions, UserActions } from "@/types/types";
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

const contact = namespace("Contacts");
const user = namespace("User");

@Component
export default class Home extends Vue {
  email = "";
  name = "";
  emailErrors = false;
  invalidEmail = false;
  emailExists = false;
  addContact = false;
  allContactList: any = [];
  isLoading = false;

  @contact.Action(ContactActions.ADD_CONTACT)
  public addToContact!: (contact: { name: string; email: string }) => void;

  @contact.Getter("loadContacts")
  public contactList!: any[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  @Watch("contactList")
  async updateProfilePics() {
    this.setAllContactList();
  }

  validateEmail(): boolean | string {
    // eslint-disable-next-line
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email) {
      this.emailErrors = true;
      return "This field is Required";
    } else if (!re.test(this.email)) {
      this.emailErrors = true;
      return "Enter valid Email";
    }
    this.emailErrors = false;
    return true;
  }

  addToContactlist(): void {
    this.addContact = false;
    this.addToContact({ name: this.name, email: this.email });
  }

  chatWithEmail(index: string): void {
    router.push({ name: "PersonalChat", params: { id: index } });
  }

  async getDownloadUrl(userEmail: string, i: number): Promise<void> {
    let picUrl;
    await this.getProfilePic(userEmail)
      .then((res: string) => {
        picUrl = res;
      })
      .catch((error) => {
        picUrl = "/assets/user.png";
      });
    return picUrl;
  }

  setAllContactList(): void {
    this.contactList.forEach(async (element, index) => {
      if (
        this.allContactList.findIndex(
          (obj: any) => obj.email === element.email
        ) === -1
      ) {
        this.allContactList.push({
          ...element,
          picUrl: await this.getDownloadUrl(element.email, index),
        });
      }
    });
  }

  created() {
    this.setAllContactList();
  }
}
</script>

<style lang="scss" scoped>
.contacts {
  .add-contact {
    margin-top: 4rem;

    .button-field {
      display: flex;
      width: 100%;

      .add-btn {
        width: 78%;
      }
      .cancel-btn {
        margin-left: auto;
        background: rgb(196, 235, 240);
        width: 20%;
      }
    }
  }
  .add-icon-field {
    display: flex;
    position: fixed;
    bottom: 20px;
    right: 20px;

    .add-icon {
      margin-left: auto;
      background: rgb(103, 106, 247);
      padding: 0.5rem;
      border-radius: 50%;
      color: white;
      font-weight: bold;
    }
  }
  .contact {
    cursor: pointer;
    background: #b0dee44b;
    margin-bottom: 0.5rem;
    &:hover {
      background: #b0dee4b6;
    }
  }
}
</style>
