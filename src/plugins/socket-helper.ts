import { io } from "socket.io-client";
import store from "@/store";
import { ChatActions, ContactActions } from "@/types/types";

export default class SocketHelper {
  public userDetails: { email: string };
  private socket: any;

  constructor() {
    this.socket = null;
    this.userDetails = { email: "" };
  }

  public connect = (): // userDetails: { email: string }
  void => {
    // this.userDetails = userDetails;
    // const userDetailsJsonString = JSON.stringify(userDetails);
    const host = `localhost:3001`;
    this.socket = io(host, { transports: ["websocket"] }).connect();
    this.eventListeners();
  };

  public eventListeners(): void {
    // this.socket.on("welcomeMessage", (msg: string) => {
    //   this.onConnected(msg);
    // });
    this.socket.on(
      "send-message-client",
      (data: { message: string; sender: string; room: string }) => {
        store.dispatch(`Chat/${ChatActions.RECEIVE_MESSAGE}`, data);
      }
    );
    this.socket.on("group-list", async (data: any) => {
      store.dispatch(`Contacts/${ContactActions.GROUP_CREATED}`, data.data);
    });
    this.socket.on("join-room-response", async (data: any) => {
      //
    });
    this.socket.on("leave-room-response", async (data: any) => {
      //
    });
  }

  public sendMessage = async (payload: {
    message: string;
    room: string;
    from: string;
  }): Promise<void> => {
    this.socket.emit("send-message-server", {
      message: payload.message,
      sender: payload.from,
      room: payload.room,
    });
  };

  public createGroup = async (data: {
    groupName: string;
    groupOwners: string[];
  }): Promise<void> => {
    this.socket.emit("create-group", data);
  };

  public joinRoom = async (payload: {
    userInfo: string;
    room: string;
  }): Promise<void> => {
    this.socket.emit("join-room", payload);
  };

  public leaveRoom = async (payload: {
    userInfo: string;
    room: string;
  }): Promise<void> => {
    this.socket.emit("leave-room", payload);
  };

  // public userTyping = (email: string): void => {
  //   this.socket.emit("typing", email);
  // };

  // public onConnected = (msg: string): void => {
  //   store.dispatch(`Socket/${SocketActions.WELCOME_MESSAGE}`, msg);
  //   this.socket.on("general_notification", (userData: string) => {
  //     store.dispatch(`Socket/${SocketActions.USER_TYPING}`, userData);
  //   });
  // };
}
