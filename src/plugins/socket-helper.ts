import { io } from 'socket.io-client';
import store from '@/store';
import { ChatActions, ContactActions, SocketActions } from '@/types/types';

export default class SocketHelper {
  public userDetails: { email: string };
  private socket: any;

  constructor() {
    this.socket = null;
    this.userDetails = { email: '' };
  }

  public connect = (): // userDetails: { email: string }
  void => {
    // this.userDetails = userDetails;
    // const userDetailsJsonString = JSON.stringify(userDetails);
    const host = `localhost:3001`;
    this.socket = io(host, { transports: ['websocket'] });
    this.eventListeners();
  };

  public eventListeners(): void {
    // this.socket.on("welcomeMessage", (msg: string) => {
    //   this.onConnected(msg);
    // });
    this.socket.on(
      'send-message-client',
      (data: { message: string; sender: string; room: string }) => {
        store.dispatch(`Chat/${ChatActions.RECEIVE_MESSAGE}`, data);
      }
    );
    this.socket.on('group-list', async (data: any) => {
      store.dispatch(`Contacts/${ContactActions.GROUP_CREATED}`, data.data);
    });
    this.socket.on('typing-client', async (data: any, socketId: string) => {
      if (socketId !== this.socket.id) {
        store.dispatch(`Socket/${SocketActions.USER_TYPING}`, data);
      }
    });
    this.socket.on('last-message-client', async (data: any) => {
      store.dispatch(`Chat/${ChatActions.LAST_MESSAGE}`, data);
    });
    this.socket.on('join-room-response', async (data: any) => {
      //
    });
    this.socket.on('leave-room-response', async (data: any) => {
      //
    });
  }

  public sendMessage = async (payload: {
    message: string;
    room: string;
    from: string;
    name: string;
  }): Promise<void> => {
    this.socket.emit('send-message-server', {
      message: payload.message,
      sender: payload.from,
      name: payload.name,
      room: payload.room,
    });
  };

  public createGroup = async (data: {
    groupName: string;
    groupOwners: string[];
  }): Promise<void> => {
    this.socket.emit('create-group', data);
  };

  public joinRoom = async (payload: {
    userInfo: string;
    room: string;
  }): Promise<void> => {
    this.socket.emit('join-room', payload);
  };

  public leaveRoom = async (payload: {
    userInfo: string;
    room: string;
  }): Promise<void> => {
    this.socket.emit('leave-room', payload);
  };

  public userTyping = (data: { name: string; roomId: string }): void => {
    this.socket.emit('typing-server', data);
  };

  public lastMessage = (data: { roomId: string }): void => {
    this.socket.emit('last-message-server', data);
  };

  // public onConnected = (msg: string): void => {
  //   store.dispatch(`Socket/${SocketActions.WELCOME_MESSAGE}`, msg);
  //   this.socket.on("general_notification", (userData: string) => {
  //     store.dispatch(`Socket/${SocketActions.USER_TYPING}`, userData);
  //   });
  // };
}
