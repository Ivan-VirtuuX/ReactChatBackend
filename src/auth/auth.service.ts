import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/schemas/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getMe(_id: string) {
    this.userService.findById(_id);
  }

  async validateUser(fullName: string, password: string): Promise<User> {
    const user = await this.userService.findByCond({
      fullName,
      password,
    });

    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(userData: any) {
    const payload = {
      fullName: userData._doc.fullName,
      userId: userData._doc.userId,
    };

    return this.jwtService.sign(payload);
  }

  async login(user) {
    const { ...userData } = user;

    return {
      ...userData._doc,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const users = await this.userService.findAll();

      const { ...userData }: any =
        !users.some((user) => user.fullName === dto.fullName) &&
        (await this.userService.create({
          _id: new mongoose.Types.ObjectId(),
          fullName: dto.fullName,
          password: dto.password,
        }));

      return {
        id: userData._doc.userId,
        fullName: userData._doc.fullName,
        token: this.generateJwtToken(userData),
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Логин занят');
    }
  }
}
