import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string) {
    const users = await this.userModel.find().exec();
    const userId = await users.find((user) => user.userId === id)?._id;

    const result = await this.userModel.findOne(userId);

    return result;
  }

  async findUserById(id: string) {
    return this.userModel.find({ userId: id });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);

    return await newUser.save();
  }

  async findOneBy(cond: LoginUserDto): Promise<User> {
    return this.userModel.findOne(cond);
  }

  async findOneAndUpdate(_id: string, dto: UpdateUserDto): Promise<any> {
    const users = await this.userModel.find();
    const result = await this.userModel.findByIdAndUpdate(
      users.find((user) => user.userId === _id)._id,
      dto,
    );

    return result;
  }

  async delete(id: string) {
    return this.userModel.deleteOne({ id });
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return await this.userModel.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          avatarUrl: avatarUrl,
        },
      },
    );
  }
}
