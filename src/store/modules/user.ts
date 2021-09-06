import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { UserActions, UserMutations } from "@/types/types";
import { login, register, userInfo } from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

@Module({ namespaced: true })
class User extends VuexModule {
  public isLoggedIn = false;
  public isLoading = false;
  public registerErrorMessage = "";
  public loginErrorMessage = "";
  public loginSuccess = false;
  public token: string | undefined = "";
  public userDetails: any = {};

  @Mutation
  public [UserMutations.SET_LOADING](): void {
    this.isLoading = !this.isLoading;
  }

  @Action
  [UserActions.SET_LOADING](): void {
    this.context.commit(UserMutations.SET_LOADING);
  }

  @Mutation
  public [UserMutations.REGISTER_ERROR](error: string): void {
    this.registerErrorMessage = error;
    this.loginErrorMessage = "";
  }

  @Mutation
  public [UserMutations.REGISTER](result: any): void {
    //
  }

  @Action
  [UserActions.REGISTER](userDetails: any): void {
    this.context.commit(UserMutations.SET_LOADING);
    this.context.commit(UserMutations.REGISTER_ERROR, "");

    register(userDetails)
      .then((result: any) => {
        this.context.commit(UserMutations.REGISTER, result);
      })
      .catch((error: AxiosError) => {
        const errorMsg = error.response?.data.message;
        this.context.commit(UserMutations.REGISTER_ERROR, errorMsg);
      })
      .finally(() => {
        this.context.commit(UserMutations.SET_LOADING);
      });
  }

  @Mutation
  public [UserMutations.IS_LOGGED_IN](token: string | undefined): void {
    this.token = token;
    if (token) {
      this.loginSuccess = true;
    }
  }

  @Action
  public [UserActions.IS_LOGGED_IN](): void {
    const token = Cookies.get("jwtToken");
    console.log(token);

    if (token) {
      this.context.commit(UserMutations.IS_LOGGED_IN, token);
      return;
    }
    this.context.commit(UserMutations.LOGOUT);
  }

  @Mutation
  public [UserMutations.LOGIN_ERROR](error: string): void {
    this.loginErrorMessage = error;
    this.registerErrorMessage = "";
    this.loginSuccess = false;
  }

  @Mutation
  public [UserMutations.LOGIN](result: AxiosResponse): void {
    this.token = result.data.token as string;
    this.loginSuccess = true;
    Cookies.set("jwtToken", this.token, { expires: 0.00069444 * 10 });
  }

  @Action
  [UserActions.LOGIN](credentials: any): void {
    this.context.commit(UserMutations.SET_LOADING);
    this.context.commit(UserMutations.LOGIN_ERROR, "");
    login(credentials)
      .then((result: any) => {
        this.context.commit(UserMutations.LOGIN, result);
        this.context.commit(UserMutations.SET_LOADING);
      })
      .catch((error: AxiosError) => {
        const errorMsg = error.response?.data.message;
        this.context.commit(UserMutations.LOGIN_ERROR, errorMsg);
      })
      .finally(() => {
        this.context.commit(UserMutations.SET_LOADING);
      });
  }

  @Mutation
  public [UserMutations.LOGOUT](): void {
    this.loginSuccess = false;
    Cookies.remove("jwtToken");
    this.token = "";
  }

  @Action
  [UserActions.LOGOUT](): void {
    this.context.commit(UserMutations.LOGOUT);
  }

  @Mutation
  public [UserMutations.GET_USER_INFO](userDetails: any): void {
    this.userDetails = userDetails;
  }

  @Action
  public [UserActions.GET_USER_INFO](): void {
    userInfo()
      .then((result: AxiosResponse) => {
        this.context.commit(UserMutations.GET_USER_INFO, result.data.data);
      })
      .catch((error: AxiosError) => {
        // console.log(error);
      });
  }

  get loginError(): string {
    return this.loginErrorMessage;
  }

  get registerError(): string {
    return this.registerErrorMessage;
  }

  get isLoginSuccess(): boolean {
    return this.loginSuccess;
  }

  get userToken(): string | undefined {
    return this.token;
  }

  get userInfo(): any {
    return this.userDetails;
  }
}
export default User;
