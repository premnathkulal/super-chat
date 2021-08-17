<template>
  <div class="login">
    <div class="form">Login</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";

@Component
export default class Login extends Vue {
  user = firebase.auth().currentUser;
  email = "";
  password = "";
  emailErrors = false;
  passwordErrors = false;
  invalidEmail = false;
  invalidPassword = false;
  emailExists = false;
  toggle_exclusive = undefined;
  register = false;
  show = false;

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
    if (this.email && this.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          if (err.code === "auth/email-already-in-use") {
            this.emailExists = true;
          }
        });
    }
  }

  loginRegisterToggle(): void {
    this.register = !this.register;
    this.email = "";
    this.password = "";
  }

  async login(): Promise<void> {
    if (this.email && this.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            this.invalidEmail = true;
          } else if (
            err.code === "auth/wrong-password" ||
            err.code === "auth/too-many-requests"
          ) {
            this.invalidPassword = true;
          }
        });
    }
  }
}
</script>

<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  @media only screen and (max-width: 800px) {
    margin-top: 0rem;
  }
  .form {
    width: 600px;
    @media only screen and (max-width: 800px) {
      width: 100%;
    }
  }

  h6 {
    cursor: pointer;
    .link-text {
      color: rgba(5, 51, 104, 0.774);
    }
  }
}
</style>
