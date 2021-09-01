import { Controller, Get } from '@nestjs/common';
import { GroupService } from './groups.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Groups APIs')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('get-all-group')
  async getAllGroups(): Promise<any> {
    const result = await this.groupService.getAllGroups();
    return result;
  }
}
