import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { connectionSocket } from "@/store";
import { SocketActions, SocketMutations } from "@/types/types";

@Module({ namespaced: true })
class Socket extends VuexModule {
  public welcomeMessage = "";
  public userTyping = "";

  public chatContent: any[] = [];

  @Action
  [SocketActions.CONNECTION](): // userDetails: { email: string }
  void {
    connectionSocket.connect();
  }

  @Action
  [SocketActions.JOIN_ROOM](data: any): void {
    connectionSocket.joinRoom(data);
  }

  @Action
  [SocketActions.LEAVE_ROOM](data: any): void {
    connectionSocket.leaveRoom(data);
  }

  // @Action
  // [SocketActions.STARTED_TYPING](email: string): void {
  //   connectionSocket.userTyping(email);
  // }

  // @Mutation
  // public [SocketMutations.USER_TYPING](userData: string): void {
  //   this.userTyping = userData;
  // }

  // @Action
  // [SocketActions.USER_TYPING](userData: string): void {
  //   this.context.commit(SocketMutations.USER_TYPING, userData);
  // }

  // get getWelcomeMessage(): string {
  //   return this.welcomeMessage;
  // }

  // get getIsUserTyping(): string {
  //   return this.userTyping;
  // }
}

export default Socket;
