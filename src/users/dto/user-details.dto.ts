import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetails {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;
}

export class User {
  @ApiProperty()
  public status: HttpStatus;

  @ApiProperty({ type: UserDetails })
  public userDetails: UserDetails;
}
