import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat/chat.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatServices: ChatService) {}

  private logger = new Logger('AppGateWay');

  @WebSocketServer() wss: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected : ${client.id}`);
  }

  @SubscribeMessage('chat-group-server')
  async handleMessage(
    client: Socket,
    payload: { message: string; sender: string; room: string },
  ): Promise<void> {
    const result = await this.chatServices.sendChatGroup(payload);
    // client.join(payload.room);
    this.wss.to(payload.room).emit('chat-group-client', result.data);
  }

  @SubscribeMessage('create-group')
  async createGroup(client: Socket, payload: any): Promise<void> {
    const result = await this.chatServices.createGroup(payload);
    client.emit('group-list', result);
    return;
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
}
