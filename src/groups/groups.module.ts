import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from './schemas/groups.schema';
import { GroupController } from './groups.controller';
import { GroupService } from './groups.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Groups', schema: GroupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
