import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Post(':id')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    console.log('Creating profile for user with ID:', id);

    return this.profilesService.createProfile(id, profile);
  }
}
