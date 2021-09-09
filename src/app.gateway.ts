import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';
import { GroupService } from './groups/groups.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatServices: ChatService,
    private readonly groupService: GroupService,
  ) {}

  private logger = new Logger('AppGateWay');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log(`${server} Initialized!`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id} ${args}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected : ${client.id}`);
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, payload: { userInfo: string; room: string }) {
    client.join(payload.room);
    client.emit('join-room-response', `Joined to ${payload.room}`);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, payload: { userInfo: string; room: string }) {
    client.leave(payload.room);
    client.emit('leave-room-response', `Leaved from ${payload.room}`);
  }

  @SubscribeMessage('send-message-server')
  async handleMessage(
    client: Socket,
    payload: { message: string; sender: string; name: string; room: string },
  ): Promise<void> {
    this.logger.log(`${client.id} Client message action`);
    const result = await this.chatServices.sendChatGroup(payload);
    this.wss.to(payload.room).emit('send-message-client', result);
    this.wss.emit('last-message-client', {
      ...payload,
      time: new Date(),
    });
  }

  @SubscribeMessage('create-group')
  async createGroup(client: Socket, payload: any): Promise<void> {
    const result = await this.groupService.createGroup(payload);
    client.emit('group-list', result);
    return;
  }

  @SubscribeMessage('typing-server')
  async userTyping(client: Socket, payload: any): Promise<void> {
    this.wss.emit('typing-client', payload, client.id);
    return;
  }
}
