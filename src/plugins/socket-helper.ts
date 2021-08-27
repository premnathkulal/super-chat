import { io } from "socket.io-client";
import store from "@/store";
import { SocketActions } from "@/types/types";

export default class SocketHelper {
  public userDetails: { email: string };
  private socket: any;

  constructor() {
    this.socket = "";
    this.userDetails = { email: "" };
  }

  public connect = (): // userDetails: { email: string }
  void => {
    // this.userDetails = userDetails;
    // const userDetailsJsonString = JSON.stringify(userDetails);
    const host = `localhost:3000`;
    this.socket = io(host, { transports: ["websocket"] }).connect();
    // this.socket = io().connect();
    // this.socket.emit("connected", `${userDetailsJsonString}`);
    // this.socket.on("welcomeMessage", (msg: string) => {
    //   this.onConnected(msg);
    // });
  };

  public sendMessage = async (message: string): Promise<void> => {
    // room: string
    await this.socket.emit("chat-group-server", message);
    await this.socket.on("chat-group-client", async (data: any) => {
      store.dispatch(`Socket/${SocketActions.RECEIVE_MESSAGE}`, data.data);
    });
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
