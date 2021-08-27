import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { ChatService } from './chat/chat.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatServices: ChatService) {}

  private logger = new Logger('AppGateWay');

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
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const result = await this.chatServices.sendChatGroup('navin123', payload);
    client.emit('chat-group-client', result);
  }

  // @SubscribeMessage('chat-group')
  // async handleMessage(client: Socket, payload: any): Promise<WsResponse<any>> {
  //   const result = await this.chatServices.sendChatGroup('navin123', payload);
  //   return { event: 'messageToClient', data: result };
  // }
}
