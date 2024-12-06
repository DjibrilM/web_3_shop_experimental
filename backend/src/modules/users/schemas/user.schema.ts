import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User {
  @Prop({ required: true })
  walletAddress: string;

  @Prop({ default: false })
  isSeller: boolean;

  @Prop({ default: 0 })
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
