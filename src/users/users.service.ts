import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/udpate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    //verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (existingUser) {
      return new HttpException('usuario ya existe', HttpStatus.CONFLICT);
    }
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['posts', 'profile'], // Assuming you want to load related posts
    });

    if (!userFound) {
      return new HttpException('usuario no existe', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async deleteUser(id: number) {
    // const userFound = await this.userRepository.findOne({
    //   where: {
    //     id: id,
    //   },
    // });
    // if (!userFound) {
    //   return new HttpException('usuario no existe', HttpStatus.NOT_FOUND);
    // }
    // return this.userRepository.delete(id);

    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('usuario no existe', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.update(id, user);
  }


}
