import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chats') public chatModule: Model<ChatDocument>) {}

  async loadChat(id: string): Promise<any> {
    const result: any = await this.chatModule.findOne({ roomId: id }).exec();
    return result;
  }

  async sendChatGroup(data: {
    message: string;
    sender: string;
    room: string;
  }): Promise<any> {
    const result: any = await this.chatModule
      .findOne({ roomId: data.room })
      .exec();

    if (!result) {
      const messageDetails = {
        roomId: data.room,
        category: 'group',
        messages: [
          {
            sender: data.sender,
            message: data.message,
            time: new Date().toString(),
          },
        ],
      };
      const newChat = new this.chatModule(messageDetails);
      await newChat.save();
    } else {
      const newMessage = {
        sender: data.sender,
        message: data.message,
        time: new Date().toString(),
      };
      result.messages.push(newMessage);
      result.save();
    }

    return {
      status: HttpStatus.OK,
      data: {
        sender: data.sender,
        message: data.message,
        time: new Date().toString(),
      },
    };
  }

  async msgTyping(id: string): Promise<any> {
    //
  }
}
