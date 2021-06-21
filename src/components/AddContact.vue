<template>
  <div>
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
      <v-btn class="mt-5 cancel-btn" @click="$emit('toggleFormField')">
        cancel
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { ContactActions } from "@/types/types";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";

const contact = namespace("Contacts");

@Component
export default class AddContact extends Vue {
  email = "";
  name = "";
  emailErrors = false;
  invalidEmail = false;
  emailExists = false;
  @contact.Action(ContactActions.ADD_CONTACT)
  public addToContact!: (contact: { name: string; email: string }) => void;

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
    this.addToContact({ name: this.name, email: this.email });
    this.$emit("toggleFormField");
  }
}
</script>

<style lang="scss">
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
</style>
