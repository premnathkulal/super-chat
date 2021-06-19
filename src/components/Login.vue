<template>
  <div class="login">
    <div class="form">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
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
          <v-text-field
            ref="password"
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              validatePassword(),
              !invalidPassword || 'Invalid Password',
            ]"
            :type="show ? 'text' : 'password'"
            label="Password"
            hint="At least 8 characters"
            placeholder="Password"
            @click:append="show = !show"
            @keypress="invalidPassword = false"
            required
          ></v-text-field>
        </v-card-text>

        <v-card-actions v-if="!register">
          <v-btn
            @click="login('emailPasswrod')"
            block
            color="primary"
            elevation="2"
            type="submit"
            :disabled="disableButton()"
            large
          >
            Login
          </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn
            @click="signUp()"
            block
            color="primary"
            elevation="2"
            :disabled="disableButton()"
            large
          >
            Register
          </v-btn>
        </v-card-actions>
        <div class="text-center py-2">
          <h6 v-if="!register">
            Don't have account?
            <span class="link-text" @click="loginRegisterToggle()">
              register here.</span
            >
          </h6>
          <h6 v-else>
            Already have account?
            <span class="link-text" @click="loginRegisterToggle()">
              login here.</span
            >
          </h6>
        </div>
      </v-card>
    </div>
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
  @media screen and (max-width: 768px) {
    margin-top: 0rem;
  }
  .form {
    width: 600px;
    @media screen and (max-width: 768px) {
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
