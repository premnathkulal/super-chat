import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { ChatMutations, ChatActions } from "@/types/types";
import { fetchGroupChat, sendGroupChat } from "@/utils/api";
import { connectionSocket } from "..";

@Module({ namespaced: true })
class Chat extends VuexModule {
  public chatContent: any = {};
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
  public async [ChatMutations.RECEIVE_MESSAGE](data: any): Promise<void> {
    const chatData: any = { ...this.chatContent };
    await chatData.messages.push(data);
    this.chatContent = chatData;
  }

  @Action
  public [ChatActions.RECEIVE_MESSAGE](data: {
    message: string;
    sender: string;
    room: string;
  }): void {
    this.context.commit(ChatMutations.RECEIVE_MESSAGE, data);
  }

  @Action
  async [ChatActions.SEND_MESSAGE](payLoad: {
    message: string;
    roomId: string;
  }): Promise<void> {
    const data = await connectionSocket.sendMessage({
      message: payLoad.message,
      room: payLoad.roomId,
      from: "navin123",
    });
  }

  get chatData(): any {
    return this.chatContent;
  }

  get isLoading(): any {
    return this.loading;
  }
}
export default Chat;
