import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id?: mongoose.Types.ObjectId;

  @Prop()
  id?: string;

  @Prop()
  userId: string;

  @Prop()
  fullName: string;

  @Prop()
  avatarUrl?: string;

  @Prop()
  password?: string;

  @Prop()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
