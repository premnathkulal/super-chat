import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './groups.service';
import { CreateGroupResponse } from './dto/create-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateGroupInput } from './dto/create-group.dto';

@ApiTags('Groups APIs')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create-group')
  async createGroup(@Body() groupDetails: CreateGroupInput): Promise<any> {
    await this.groupService.createGroup(groupDetails);
    return {
      data: groupDetails,
    };
  }
}
