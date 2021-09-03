import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterResponse } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterInput } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDetails } from './dto/user-details.dto';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() userDetails: any): Promise<any> {
    return await this.userService.loginUser(userDetails);
  }
}
