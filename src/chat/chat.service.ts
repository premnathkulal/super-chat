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
    name: string;
    room: string;
  }): Promise<any> {
    const result: any = await this.chatModule
      .findOne({ roomId: data.room })
      .exec();

    const time = new Date().toString();

    if (!result) {
      const messageDetails = {
        roomId: data.room,
        category: 'group',
        messages: [
          {
            sender: data.sender,
            name: data.name,
            message: data.message,
            time,
          },
        ],
      };
      const newChat = new this.chatModule(messageDetails);
      await newChat.save();
    } else {
      const newMessage = {
        sender: data.sender,
        name: data.name,
        message: data.message,
        time,
      };
      result.messages.push(newMessage);
      result.save();
    }

    return {
      status: HttpStatus.OK,
      data: {
        sender: data.sender,
        name: data.name,
        message: data.message,
        time,
      },
    };
  }

  async getLastMessage(roomIds: any): Promise<any> {
    const result: any = await this.chatModule.aggregate([
      { $match: { roomId: { $in: roomIds } } },
      {
        $project: {
          _id: 0,
          roomId: 1,
          message: { $arrayElemAt: ['$messages', -1] },
        },
      },
    ]);
    return result;
  }
}
