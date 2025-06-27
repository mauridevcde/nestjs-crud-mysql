import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/udpate-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersServices.createUser(newUser);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersServices.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersServices.updateUser(id, user);
  }
}
