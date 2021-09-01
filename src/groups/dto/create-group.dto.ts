import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupResponse {
  @ApiProperty()
  public response: string;

  @ApiProperty()
  public statusCode: number;
}

export class CreateGroupInput {
  @ApiProperty({ required: true })
  public groupName: string;

  @ApiProperty({ required: false })
  public groupDpUrl: string;

  @ApiProperty({ required: true, isArray: true })
  public groupOwners: string[];
}
