import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(id: number, profile: CreateProfileDto) {
    //verificar si el perfil ya existe
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['profile'], // Ensure to load the profile relation
    });

    if (!userFound) {
      return new HttpException('usuario no existe', HttpStatus.NOT_FOUND);
    }
    // Log the user being processed

    console.log('Creating profile for user:', userFound);

    // Check if the user already has a profile
    if (userFound.profile && userFound.profile.id) {
      return new HttpException(
        'usuario ya tiene un perfil',
        HttpStatus.CONFLICT,
      );
    }

    // Create a new profile instance
    const newProfile = this.profileRepository.create(profile);

    // Save the profile to the database
    const savedProfile = await this.profileRepository.save(newProfile);

    // Associate the profile with the user
    userFound.profile = savedProfile;

    // Save the user with the new profile
    return this.userRepository.save(userFound);
  }
}
