import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupResponse, CreateGroupInput } from './dto/create-group.dto';
import { GroupDocument } from './schemas/groups.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel('Groups') public groupModule: Model<GroupDocument>,
  ) {}

  async createGroup(
    groupDetails: CreateGroupInput,
  ): Promise<CreateGroupResponse> {
    if (!groupDetails.groupName) {
      this.httpException('Group name required', 400);
    }

    const newGroup = new this.groupModule(groupDetails);
    const result = await newGroup.save();

    return {
      status: HttpStatus.CREATED,
      response: 'created',
      data: result,
    };
  }

  async getAllGroups(): Promise<CreateGroupResponse> {
    const result = await this.groupModule.find().exec();

    return {
      status: HttpStatus.CREATED,
      response: 'created',
      data: result,
    };
  }

  private httpException(exception: string, statusCode: number) {
    throw new HttpException(exception, statusCode);
  }
}
