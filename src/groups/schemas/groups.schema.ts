import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;
@Schema()
export class Group {
  @Prop()
  groupName: string;

  @Prop()
  groupDpUrl: string;

  @Prop()
  groupOwners: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
