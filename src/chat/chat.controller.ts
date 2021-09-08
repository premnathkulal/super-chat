import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatServices: ChatService) {}

  @Get('/load-chat/:id')
  async findChatGroup(@Param('id') id: string): Promise<any> {
    const data = await this.chatServices.loadChat(id);
    return {
      status: HttpStatus.OK,
      data,
    };
  }

  @Post('/last-message/')
  async getLastMessage(@Body() data: any): Promise<any> {
    const roomIds = JSON.parse(data.roomIds);
    const result = await this.chatServices.getLastMessage(roomIds);

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }
}
