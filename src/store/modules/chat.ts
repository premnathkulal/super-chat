import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { ChatMutations, ChatActions } from '@/types/types';
import { fetchGroupChat, getLastMessage } from '@/utils/api';
import { connectionSocket } from '@/store';
import { AxiosResponse } from 'axios';

@Module({ namespaced: true })
class Chat extends VuexModule {
  public chatContent: any = {};
  public loading = true;
  public formateLastMessages = true;
  public uid: string | null = null;
  public lastMessages: any = {};

  @Mutation
  public async [ChatMutations.SET_LOADING](
    isLoading = !this.loading
  ): Promise<void> {
    this.loading = isLoading;
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
    fetchGroupChat(id)
      .then(async data => {
        await this.context.commit(ChatMutations.LOAD_CHAT, data.data.data);
      })
      .finally(() => {
        this.context.commit(ChatMutations.SET_LOADING);
      });
  }

  @Mutation
  public async [ChatMutations.RECEIVE_MESSAGE](data: any): Promise<void> {
    console.log(data);

    if (this.chatContent) {
      const chatData: any = { ...this.chatContent };
      await chatData.messages.push(data);
      this.chatContent = chatData;
      return;
    }
    this.loading = true;
    fetchGroupChat(data.room)
      .then(async data => {
        this.chatContent = data.data.data;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  @Action
  public [ChatActions.RECEIVE_MESSAGE](data: any): void {
    this.context.commit(ChatMutations.RECEIVE_MESSAGE, data);
  }

  @Action
  async [ChatActions.SEND_MESSAGE](payLoad: {
    message: string;
    roomId: string;
    sender: string;
    name: string;
  }): Promise<void> {
    const data = await connectionSocket.sendMessage({
      message: payLoad.message,
      room: payLoad.roomId,
      from: payLoad.sender,
      name: payLoad.name,
    });
    this.context.commit(ChatMutations.LAST_MESSAGE, 'data');
  }

  @Mutation
  public async [ChatMutations.LAST_MESSAGE](data: any): Promise<void> {
    const chatData: any = { ...this.lastMessages };
    chatData[data.room] = {
      sender: data.sender,
      name: data.name,
      message: data.message,
      time: data.time,
    };
    this.lastMessages = chatData;
  }

  @Action
  public async [ChatActions.LAST_MESSAGE](data: any): Promise<void> {
    this.context.commit(ChatMutations.LAST_MESSAGE, data);
  }

  @Mutation
  public async [ChatMutations.FORMATE_MESSAGE](
    isLoading: boolean
  ): Promise<void> {
    this.formateLastMessages = isLoading;
  }

  @Mutation
  public async [ChatMutations.GET_LAST_MESSAGE](data: any): Promise<void> {
    data.forEach((lastMessage: any, index: number) => {
      this.lastMessages[lastMessage.roomId] = lastMessage.message;
      if (index === data.length - 1) {
        this.formateLastMessages = false;
      }
    });
  }

  @Action
  [ChatActions.GET_LAST_MESSAGE](groupList: any): void {
    const groupIDs: any = [];
    groupList.forEach((group: any) => {
      groupIDs.push(group._id);
    });
    getLastMessage(JSON.stringify(groupIDs)).then((result: AxiosResponse) => {
      this.context.commit(ChatMutations.FORMATE_MESSAGE, true);
      this.context.commit(ChatMutations.GET_LAST_MESSAGE, result.data.data);
    });
  }

  get chatData(): any {
    return this.chatContent;
  }

  get isLoading(): any {
    return this.loading;
  }

  get lastMessage(): any {
    return this.lastMessages;
  }
}
export default Chat;
