import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { UserActions, UserMutations } from "@/types/types";
import { updateProfilePic, getProfilePic } from "@/utils/api";

@Module({ namespaced: true })
class User extends VuexModule {
  public isLoggedIn = false;
  public uidEmail: { uid: string; email: string } = {
    uid: "",
    email: "",
  };
  public downloadUrl: string | null = "";
  public messageDisplayUserId = "";
  public picUrl = "";

  @Mutation
  public [UserMutations.GET_USER_PIC](picUrl: string): void {
    this.picUrl = picUrl;
  }

  @Action
  [UserActions.GET_USER_PIC](email: string): void {
    getProfilePic(email.split("@")[0]).then((res) => {
      this.context.commit(
        UserMutations.GET_USER_PIC,
        res.data?.downloadUrl || ""
      );
    });
  }

  @Mutation
  public [UserMutations.SET_USER_PIC](downloadUrl: string): void {
    updateProfilePic({ downloadUrl }, this.uidEmail.email.split("@")[0]);
  }

  @Action
  [UserActions.SET_USER_PIC](downloadUrl: string): void {
    this.context.commit(UserMutations.SET_USER_PIC, downloadUrl);
  }

  @Mutation
  public [UserMutations.SET_USER_ID_EMAIL](uidEmail: {
    uid: string;
    email: string;
  }): void {
    this.uidEmail = uidEmail;
  }

  @Action
  [UserActions.SET_USER_ID_EMAIL](
    uidEmail: { uid: string; email: string } | null
  ): void {
    this.context.commit(UserMutations.SET_USER_ID_EMAIL, uidEmail);
  }

  @Mutation
  public ["prem_m"](userId: string): void {
    this.messageDisplayUserId = userId;
  }

  @Action
  ["prem_a"](userId: string): void {
    this.context.commit("prem_m", userId);
  }

  get getUserId(): string {
    return this.messageDisplayUserId;
  }

  get getProfilePic(): string {
    return this.picUrl;
  }
}
export default User;
