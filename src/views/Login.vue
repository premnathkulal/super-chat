<template>
  <div class="login">
    <div class="form">
      <div class="toggle-btn">
        <div
          class="button"
          :class="{ active: !createAccountTab }"
          @click="createAccountTab = false"
        >
          Login
        </div>
        <div
          class="button"
          :class="{ active: createAccountTab }"
          @click="createAccountTab = true"
        >
          Register
        </div>
      </div>
      <div class="input-form">
        <div class="input-area">
          <div v-if="createAccountTab" class="input-box">
            <input type="text" class="text-box" :placeholder="`Name`" />
          </div>
          <div class="input-box">
            <input type="text" class="text-box" :placeholder="`Email`" />
          </div>
          <div class="input-box">
            <input type="text" class="text-box" :placeholder="`Password`" />
          </div>
        </div>
        <button class="submit-button">Create</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  name = "";
  emailErrors = false;
  passwordErrors = false;
  invalidEmail = false;
  invalidPassword = false;
  emailExists = false;
  register = false;
  createAccountTab = false;

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

  validatePassword(): boolean | string {
    if (!this.password) {
      this.passwordErrors = true;
      return "This field is Required";
    } else if (this.password.length < 8) {
      this.passwordErrors = true;
      return "Password length should be greater than 8";
    }
    this.passwordErrors = false;
    return true;
  }

  disableButton(): boolean {
    return this.emailErrors || this.passwordErrors;
  }

  signUp(): void {
    if (this.name && this.email && this.password) {
      //
    }
  }

  loginRegisterToggle(): void {
    this.register = !this.register;
    this.email = "";
    this.password = "";
  }

  async login(): Promise<void> {
    if (this.name && this.email && this.password) {
      //
    }
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
      margin-top: 2rem;
      display: flex;
      flex-direction: column;

      .input-area {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        margin: 0 0.5rem;

        .input-box {
          width: 100%;
          margin-bottom: 1.5rem;
          display: flex;
          flex: 1;
          align-items: center;
          background: white;
          padding: 0.8rem;
          height: 1rem;
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
        margin: 0 0.7rem;
        margin-bottom: 1.5rem;
        padding: 0.6rem;
        cursor: pointer;
        box-shadow: none;
        outline: none;
        border: none;
        box-shadow: 0px 0px 0px rgb(153, 149, 149);
        font-size: 1rem;
      }
    }
  }
}
</style>
