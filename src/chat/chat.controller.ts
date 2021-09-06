import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
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
}
