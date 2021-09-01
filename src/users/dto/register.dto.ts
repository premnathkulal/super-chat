import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty()
  public response: string;

  @ApiProperty()
  public statusCode: number;
}

export class RegisterInput {
  @ApiProperty({ required: true })
  public name: string;

  @ApiProperty({ required: true })
  public email: string;

  @ApiProperty({ required: true })
  public password: string;
}
