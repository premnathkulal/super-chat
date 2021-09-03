import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginResponse } from './dto/login.dto';
import { RegisterResponse, RegisterInput } from './dto/register.dto';
import { UserDetails } from './dto/user-details.dto';
import { User } from './dto/user.dto';
import { UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') public userModule: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userModule.findOne({
      email: email,
    });
    return user as User;
  }

  async registerUser(userDetail: RegisterInput): Promise<RegisterResponse> {
    if (!userDetail.email) {
      this.httpException('User name required', 400);
    }
    if (!userDetail.password) {
      this.httpException('Password required', 400);
    }

    const isUserExists = await this.findUser(userDetail.email);
    if (!!isUserExists) {
      this.httpException('User name already exists', 409);
    }

    const newUser = new this.userModule({
      name: userDetail.name,
      email: userDetail.email,
      password: userDetail.password,
    });
    const result = await newUser.save();
    return {
      response: 'created',
      statusCode: 201,
    };
  }

  async validateUser(email: string, password: string): Promise<UserDetails> {
    const user = await this.findUser(email);
    if (user && user.password === password) {
      const { id, email, name } = user;
      return { id, email, name };
    }
    return null;
  }

  async loginUser(userDetails: any): Promise<LoginResponse> {
    const payload = {
      id: userDetails.id,
      email: userDetails.email,
    };
    const access_token = await this.jwtService.sign(payload);
    return {
      status: HttpStatus.OK,
      token: access_token,
    };
  }

  private httpException(exception: string, statusCode: number) {
    throw new HttpException(exception, statusCode);
  }
}
