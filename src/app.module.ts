import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
