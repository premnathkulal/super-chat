import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterResponse } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterInput } from './dto/register.dto';

@ApiTags('Authentication APIs')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(
    @Body() userDetails: RegisterInput,
  ): Promise<RegisterResponse> {
    return await this.userService.registerUser(userDetails);
  }
}
