import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isAddress } from 'util/ethersjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create({ walletAddress }: CreateUserDto): Promise<User> {
    const existinguser = await this.userModel.findOne({
      walletAddress: walletAddress,
    });

    if (existinguser) {
      return existinguser as any;
    } else if (!isAddress(walletAddress)) {
      throw new BadRequestException('Invalid address sent!');
    }

    return await this.userModel.create({ walletAddress });
  }

  async findOne(walletAddress: string) {
    return await this.userModel.findOne({ walletAddress });
  }

  async update(walletAddress: string, { isSeller }: UpdateUserDto) {
    console.log({walletAddress});
    const user = await this.userModel.findOne({ walletAddress });
    console.log(user)
    if (user && user.isSeller) return user as any;

    return await this.userModel.findOneAndUpdate(
      { walletAddress },
      { isSeller },
    );
  }
}
