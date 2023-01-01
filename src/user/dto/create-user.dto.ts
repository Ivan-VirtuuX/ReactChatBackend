import { Length } from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  _id: mongoose.Types.ObjectId;

  @Length(6, 32, { message: 'Длина пароля должна быть минимум 6 символов' })
  password?: string;
}
