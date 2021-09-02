import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from 'src/chat/schemas/chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chats', schema: ChatSchema }])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
