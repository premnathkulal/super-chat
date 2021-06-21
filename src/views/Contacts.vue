<template>
  <div class="container contacts">
    <div class="add-contact">
      <div @click="addContact = !addContact" class="add-icon-field">
        <v-icon class="add-icon">
          {{ !addContact ? "mdi-plus" : "mdi-close" }}
        </v-icon>
      </div>
      <AddContact v-if="addContact" @toggleFormField="toggleFormField" />
    </div>
    <div class="contacts-list mt-4">
      <template v-for="(contact, index) in allContactList">
        <contact :key="index" :index="index" :contact="contact" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { UserActions } from "@/types/types";
import { Vue, Component, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import Contact from "@/components/Contact.vue";
import AddContact from "@/components/AddContact.vue";
import { ContactList } from "@/types/interface";

const contact = namespace("Contacts");
const user = namespace("User");

@Component({
  components: {
    Contact,
    AddContact,
  },
})
export default class Home extends Vue {
  allContactList: ContactList[] = [];
  addContact = false;

  @contact.Getter("loadContacts")
  public contactList!: ContactList[];

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<string>;

  @Watch("contactList")
  async updateProfilePics(): Promise<void> {
    await this.setAllContactList();
  }

  async getDownloadUrl(userEmail: string): Promise<void> {
    let picUrl;
    await this.getProfilePic(userEmail)
      .then((res: string) => {
        picUrl = res;
      })
      .catch(() => {
        picUrl = "/assets/user.png";
      });
    return picUrl;
  }

  toggleFormField(): void {
    this.addContact = !this.addContact;
  }

  async setAllContactList(): Promise<void> {
    let arrayLength = 0;
    new Promise((resolve) => {
      this.contactList.forEach(async (element) => {
        const url = await this.getDownloadUrl(element.email);
        element.picUrl = url as unknown as string;
        arrayLength++;
        if (arrayLength === this.contactList.length) {
          resolve("Done");
        }
      });
    })
      .then(() => {
        this.allContactList = { ...this.contactList };
      })
      .catch(() => {
        console.log("Error");
      });
  }

  created(): void {
    this.setAllContactList();
  }
}
</script>

<style lang="scss" scoped>
.contacts {
  .add-icon-field {
    display: flex;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;

    .add-icon {
      margin-left: auto;
      background: rgb(103, 106, 247);
      padding: 0.5rem;
      border-radius: 50%;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
