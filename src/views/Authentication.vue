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
            @keypressAction="
              nameError = '';
              errorMessage = '';
            "
          />
          <custom-input
            class="input-component"
            placeholder="Email"
            v-model="email"
            :errorMessage="emailError"
            @blurAction="validateEmail()"
            @keypressAction="
              emailError = '';
              errorMessage = '';
            "
          />
          <custom-input
            class="input-component"
            placeholder="Password"
            v-model="password"
            :errorMessage="passwordError"
            @blurAction="validatePassword()"
            @keypressAction="
              passwordError = '';
              errorMessage = '';
            "
          />
        </div>
        <p class="error-message">{{ errorMessage }}</p>
        <custom-button
          :btnName="createAccountTab ? 'Register' : 'Login'"
          :disableButton="disableButton()"
          @btnAction="buttonAction()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";
import { namespace } from "vuex-class";
import { UserActions } from "@/types/types";
import router from "@/router";

const user = namespace("User");

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
  errorMessage = "";

  @user.Getter
  public isLoginSuccess!: boolean;

  @user.Getter
  public loginError!: any;

  @user.Getter
  public registerError!: (userDetails: any) => any;

  @user.Action(UserActions.REGISTER)
  public registerUser!: (userDetails: any) => any;

  @user.Action(UserActions.LOGIN)
  public loginUser!: (credentials: any) => any;

  @Watch("isLoginSuccess")
  loginSuccess(): void {
    router.push({ name: "Home" });
  }

  @Watch("loginError")
  @Watch("registerError")
  watch(): void {
    if (this.loginError) {
      this.errorMessage = this.loginError as unknown as string;
    } else if (this.registerError) {
      this.errorMessage = this.registerError as unknown as string;
    } else {
      this.createAccountTab = false;
    }
  }

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
    } else if (this.password.length < 2) {
      this.passwordError = "Password length should be greater than 8";
    }
  }

  clearForm(): void {
    this.name = "";
    this.email = "";
    this.password = "";
    this.nameError = "";
    this.emailError = "";
    this.passwordError = "";
    this.errorMessage = "";
  }

  loginRegisterToggle(): void {
    this.createAccountTab = !this.createAccountTab;
    this.clearForm();
  }

  buttonAction(): void {
    if (this.createAccountTab) {
      this.registerUser({
        name: this.name,
        email: this.email,
        password: this.password,
      });
    } else {
      this.loginUser({
        username: this.email,
        password: this.password,
      });
    }
  }

  @Watch("name")
  @Watch("email")
  @Watch("password")
  disableButton(): boolean {
    const isErrorMessage =
      !!this.nameError || !!this.emailError || !!this.passwordError;
    let isError = !this.email || !this.password;
    if (this.createAccountTab) {
      isError = isError || !this.name;
    }
    return isErrorMessage || isError;
  }

  created(): void {
    this.disableButton();
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

      .error-message {
        color: red;
        text-align: center;
        padding: 0 0 0.8rem 0;
      }
    }
  }
}
</style>
