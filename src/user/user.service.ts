import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.repository.create({
      _id: dto._id,
      userId: uuidv4(),
      fullName: dto.fullName,
      avatarUrl: '',
      password: dto.password,
      createdAt: new Date(),
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findById(_id: string): Promise<User> {
    return this.repository.findOne(_id);
  }

  async findByCond(cond: LoginUserDto): Promise<User> {
    return this.repository.findOneBy(cond);
  }

  async update(_id: string, dto: UpdateUserDto): Promise<User> {
    const result = await this.repository.findOneAndUpdate(_id, dto);

    return result;
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return this.repository.updateAvatar(userId, avatarUrl);
  }
}
