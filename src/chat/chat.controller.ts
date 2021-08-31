import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatServices: ChatService) {}

  @Get('/chat-group/:id')
  async findChatGroup(@Param('id') id: string): Promise<any> {
    const data = await this.chatServices.findChatGroup(id);
    return {
      status: HttpStatus.OK,
      data,
    };
  }

  @Post('/chat-group/:id')
  async chatGroup(
    @Param('id') id: string,
    @Body() data: { data: string },
  ): Promise<any> {
    // const result = this.chatServices.sendChatGroup(id, data.data);
    return { status: HttpStatus.OK, data };
  }

  @Post('/create-group')
  async createGroup(@Body() data: { data: string }): Promise<any> {
    const result = await this.chatServices.createGroup(data.data);
    return result;
  }

  // @Post('chat-group/:id')
  // async userTyping(@Param('id') id: string): Promise<any> {
  //   return {
  //     status: HttpStatus.OK,
  //     data: {
  //       name: 'Premnath',
  //       msg: 'Hello',
  //     },
  //   };
  // }
}
