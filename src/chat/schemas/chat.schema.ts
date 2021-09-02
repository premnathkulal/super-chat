import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Message {
  @Prop()
  sender: string;

  @Prop()
  message: string;

  @Prop()
  time: string;
}

@Schema()
export class Chat {
  @Prop()
  roomId: string;

  @Prop()
  category: string;

  @Prop()
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
