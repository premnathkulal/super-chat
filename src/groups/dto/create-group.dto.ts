import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupInput {
  @ApiProperty({ required: true })
  public groupName: string;

  @ApiProperty({ required: false })
  public groupDpUrl: string;

  @ApiProperty({ required: true, isArray: true })
  public groupOwners: string[];
}

export class CreateGroupResponse {
  @ApiProperty()
  public status: HttpStatus;

  @ApiProperty()
  public response: string;

  @ApiProperty()
  public data: CreateGroupInput | CreateGroupInput[];
}
