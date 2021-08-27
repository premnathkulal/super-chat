import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ChatMutations, ChatActions } from "@/types/types";
import { fetchGroupChat, sendGroupChat } from "@/utils/api";

@Module({ namespaced: true })
class Chat extends VuexModule {
  public chatContent: any[] = [];
  public loading = false;
  public uid: string | null = null;

  @Mutation
  public async [ChatMutations.SET_LOADING](): Promise<void> {
    this.loading = !this.loading;
  }

  @Action
  [ChatActions.SET_LOADING](): void {
    this.context.commit(ChatMutations.SET_LOADING);
  }

  @Mutation
  public [ChatMutations.LOAD_CHAT](chat: any): void {
    this.chatContent = chat;
  }

  @Action
  [ChatActions.LOAD_CHAT](id: string): void {
    this.context.commit(ChatMutations.SET_LOADING);
    fetchGroupChat(id).then(async (data) => {
      await this.context.commit(ChatMutations.LOAD_CHAT, data.data.data);
      this.context.commit(ChatMutations.SET_LOADING);
    });
  }

  @Mutation
  public [ChatMutations.SEND_MESSAGE](): void {
    //
  }

  @Action
  [ChatActions.SEND_MESSAGE](data: { id: string; message: string }): void {
    // this.context.commit(ChatMutations.SET_LOADING);
    sendGroupChat(data.id, data.message).then(async (data) => {
      // await this.context.commit(ChatMutations.SEND_MESSAGE, data.data.data);
      // this.context.commit(ChatMutations.SET_LOADING);
    });
  }

  get chat(): any {
    return this.chatContent;
  }

  get isLoading(): any {
    return this.loading;
  }
}
export default Chat;
