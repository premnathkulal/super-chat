<template>
  <div class="login">
    <div class="form">
      <div class="toggle-btn">
        <div
          class="button"
          :class="{ active: !createAccountTab }"
          @click="loginRegisterToggle()"
        >
          Login
        </div>
        <div
          class="button"
          :class="{ active: createAccountTab }"
          @click="loginRegisterToggle()"
        >
          Register
        </div>
      </div>
      <div class="input-form">
        <div class="input-area">
          <custom-input
            v-if="createAccountTab"
            class="input-component"
            placeholder="Name"
            v-model="name"
            :errorMessage="nameError"
            @blurAction="validateName()"
            @keypressAction="nameError = ''"
          />
          <custom-input
            class="input-component"
            placeholder="Email"
            v-model="email"
            :errorMessage="emailError"
            @blurAction="validateEmail()"
            @keypressAction="emailError = ''"
          />
          <custom-input
            class="input-component"
            placeholder="Password"
            v-model="password"
            :errorMessage="passwordError"
            @blurAction="validatePassword()"
            @keypressAction="passwordError = ''"
          />
        </div>
        <custom-button
          :btnName="createAccountTab ? 'Register' : 'Login'"
          @btnAction="buttonAction()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class Authentication extends Vue {
  email = "";
  password = "";
  name = "";
  nameError = "";
  emailError = "";
  passwordError = "";
  register = false;
  createAccountTab = false;

  validateName(): void {
    this.emailError = "";
    if (this.name.length < 4) {
      this.nameError = "Name must be 4 character long";
    }
  }

  validateEmail(): void {
    this.emailError = "";
    // eslint-disable-next-line
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.email) {
      this.emailError = "This field is Required";
    } else if (!re.test(this.email)) {
      this.emailError = "Enter valid Email";
    }
  }

  validatePassword(): void {
    this.passwordError = "";
    if (!this.password) {
      this.passwordError = "This field is Required";
    } else if (this.password.length < 8) {
      this.passwordError = "Password length should be greater than 8";
    }
  }

  disableButton(): boolean {
    return !!this.emailError || !!this.passwordError;
  }

  clearForm(): void {
    this.name = "";
    this.email = "";
    this.password = "";
    this.nameError = "";
    this.emailError = "";
    this.passwordError = "";
  }

  loginRegisterToggle(): void {
    this.clearForm();
    this.createAccountTab = !this.createAccountTab;
  }

  buttonAction(): void {
    console.log("Hello");
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8% 0;
  overflow-y: scroll;
  height: 70vh;

  .form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #e9e2f7;
    width: 550px;
    padding: 1.5rem;

    @media only screen and (max-width: 900px) {
      width: 80%;
    }

    .toggle-btn {
      cursor: pointer;
      display: flex;
      width: 100%;
      margin-bottom: 2rem;

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
