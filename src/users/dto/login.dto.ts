import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  public status: HttpStatus;

  @ApiProperty()
  public token: string;
}

export class LoginInput {
  @ApiProperty({ required: true })
  public email: string;

  @ApiProperty({ required: true })
  public password: string;
}
