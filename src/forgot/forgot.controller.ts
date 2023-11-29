import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { CreateForgotDto } from './dto/create-forgot.dto';
import { UpdateForgotDto } from './dto/update-forgot.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('forgot')
export class ForgotController {
  constructor(private readonly forgotService: ForgotService) {}

  @ApiQuery({ name: 'email' })
  @Get('email')
  checkEmail(@Query() args: { email: string }) {
    return this.forgotService.checkEmail(args.email);
  }

  @ApiQuery({ name: 'userId' })
  @ApiQuery({ name: 'code' })
  @Get('code')
  resetPassword(@Query() args: { userId: string; code: string }) {
    return this.forgotService.resetPassword(args.userId, args.code);
  }
}
