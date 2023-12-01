import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiHeader({ name: 'Authorization' })
  @ApiQuery({ name: 'userId' })
  @Get('one')
  getDataProfile(@Query() args: { userId: string }, @Req() req: Request) {
    return this.profileService.getDataProfile(args.userId, req);
  }

  @ApiHeader({ name: 'Authorization' })
  @Put('email')
  editEmail(@Body() data: UpdateEmailDto, @Req() req: Request) {
    return this.profileService.editEmail(data, req);
  }

  @ApiHeader({ name: 'Authorization' })
  @Put('phone')
  editPhone(@Body() data: UpdatePhoneDto, @Req() req: Request) {
    return this.profileService.editPhone(data, req);
  }

  @ApiHeader({ name: 'Authorization' })
  @Put('password')
  editPassword(@Body() data: UpdatePasswordDto, @Req() req: Request) {
    return this.profileService.editPassword(data, req);
  }

  @ApiHeader({ name: 'Authorization' })
  @Put('settings')
  editSettings(@Body() data: UpdateSettingsDto, @Req() req: Request) {
    return this.profileService.editSettings(data, req);
  }

  @ApiHeader({ name: 'Authorization' })
  @Post('create')
  createNewProfile(@Body() data: CreateProfileDto, @Req() req: Request) {
    return this.profileService.createNewProfile(data, req);
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiQuery({ name: 'userId' })
  @Delete('delete')
  deleteProfile(@Query() args: { userId: string }, @Req() req: Request) {
    return this.profileService.deleteProfile(args.userId, req);
  }
}
