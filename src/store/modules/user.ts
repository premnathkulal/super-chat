import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { UserActions, UserMutations } from "@/types/types";
import { login, register } from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";

@Module({ namespaced: true })
class User extends VuexModule {
  public isLoggedIn = false;
  public isLoading = false;
  public registerErrorMessage = "";
  public loginErrorMessage = "";

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
  public [UserMutations.LOGIN_ERROR](error: string): void {
    this.loginErrorMessage = error;
    this.registerErrorMessage = "";
  }

  @Mutation
  public [UserMutations.LOGIN](result: any): void {
    //
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

  get loginError(): string {
    return this.loginErrorMessage;
  }

  get registerError(): string {
    return this.registerErrorMessage;
  }
}
export default User;
