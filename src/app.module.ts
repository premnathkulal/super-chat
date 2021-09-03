import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from './groups/groups.module';

@Module({
  imports: [
    ChatModule,
    UsersModule,
    GroupModule,
    MongooseModule.forRoot(
      'mongodb+srv://premnathkulal1998:1Wtfp26D9xAfSQnX@cluster0.wfsyt.mongodb.net/super-chat?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
