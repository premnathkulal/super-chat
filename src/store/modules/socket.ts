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

  @Mutation
  public [SocketMutations.RECEIVE_MESSAGE](message: any): void {
    this.chatContent = message;
  }

  @Action
  public [SocketActions.RECEIVE_MESSAGE](message: string): void {
    this.context.commit(SocketMutations.RECEIVE_MESSAGE, message);
  }

  @Action
  async [SocketActions.SEND_MESSAGE](message: string): Promise<void> {
    const data = await connectionSocket.sendMessage(message);
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

  get chat(): any {
    return this.chatContent;
  }
}

export default Socket;
