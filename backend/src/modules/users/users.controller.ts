import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':walletAddress')
  findOne(@Param('walletAddress') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':walletAddress')
  update(
    @Param('walletAddress') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }
}
