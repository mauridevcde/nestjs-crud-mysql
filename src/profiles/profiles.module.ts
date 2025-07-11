import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfilesController],
  providers: [ProfilesService]
})
export class ProfilesModule {}
 