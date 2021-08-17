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

  public connect = (userDetails: { email: string }): void => {
    this.userDetails = userDetails;
    const userDetailsJsonString = JSON.stringify(userDetails);
    console.log(userDetails);
    // const host = `localhost:3002`;
    // this.socket = io(host).connect();
    this.socket = io().connect();
    this.socket.emit("connected", `${userDetailsJsonString}`);
    this.socket.on("welcomeMessage", (msg: string) => {
      this.onConnected(msg);
    });
  };

  public userTyping = (email: string): void => {
    this.socket.emit("typing", email);
  };

  public onConnected = (msg: string): void => {
    store.dispatch(`Socket/${SocketActions.WELCOME_MESSAGE}`, msg);
    this.socket.on("general_notification", (userData: string) => {
      store.dispatch(`Socket/${SocketActions.USER_TYPING}`, userData);
    });
  };
}
