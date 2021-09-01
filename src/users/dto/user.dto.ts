import { ApiProperty } from '@nestjs/swagger';
import { UserDetails } from './user-details.dto';

export class User extends UserDetails {
  @ApiProperty()
  public password: string;
}
