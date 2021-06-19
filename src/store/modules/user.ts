import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { UserActions, UserMutations } from "@/utils/types";
import { updateUserInfo, updateProfilePic, getProfilePic } from "@/utils/api";

@Module({ namespaced: true })
class User extends VuexModule {
  public userInfo: any[] = [];
  public isLoggedIn = false;
  public uidEmail: any | null = {};
  public downloadUrl: any | null = "";

  @Mutation
  public [UserMutations.SET_USER_INFO](userInfo: any): void {
    this.userInfo = [...userInfo];
    updateUserInfo(userInfo, this.uidEmail.uid);
  }

  @Action
  [UserActions.SET_USER_INFO](userInfo: any): void {
    this.context.commit(UserMutations.SET_USER_INFO, userInfo);
  }

  @Action
  async [UserActions.GET_USER_PIC](email: string): Promise<any> {
    return await getProfilePic(email.split("@")[0]).then((res) => {
      return res.data.downloadUrl;
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
  public [UserMutations.SET_USER_ID_EMAIL](uid: string): void {
    this.uidEmail = uid;
    if (!uid) {
      this.userInfo = [];
    }
  }

  @Action
  [UserActions.SET_USER_ID_EMAIL](uidEmail: any | null): void {
    this.context.commit(UserMutations.SET_USER_ID_EMAIL, uidEmail);
  }

  get loadUserInfo(): any {
    return this.userInfo;
  }
}
export default User;
