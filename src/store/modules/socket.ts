import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { connectionSocket } from "@/store";
import { SocketActions, SocketMutations } from "@/types/types";

@Module({ namespaced: true })
class Socket extends VuexModule {
  public welcomeMessage = "";
  public userTyping = "";

  @Mutation
  public [SocketMutations.WELCOME_MESSAGE](message: string): void {
    this.welcomeMessage = message;
  }

  @Action
  [SocketActions.WELCOME_MESSAGE](message: string): void {
    this.context.commit(SocketMutations.WELCOME_MESSAGE, message);
  }

  @Action
  [SocketActions.CONNECTION](userDetails: { email: string }): void {
    connectionSocket.connect(userDetails);
  }

  @Action
  [SocketActions.STARTED_TYPING](email: string): void {
    connectionSocket.userTyping(email);
  }

  @Mutation
  public [SocketMutations.USER_TYPING](userData: string): void {
    this.userTyping = userData;
  }

  @Action
  [SocketActions.USER_TYPING](userData: string): void {
    this.context.commit(SocketMutations.USER_TYPING, userData);
  }

  get getWelcomeMessage(): string {
    return this.welcomeMessage;
  }

  get getIsUserTyping(): string {
    return this.userTyping;
  }
}

export default Socket;
