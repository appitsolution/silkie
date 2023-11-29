import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiHeader, ApiHeaders } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: CreateAuthDto) {
    return this.authService.create(data);
  }

  @Post('login')
  loginClient(@Body() data: LoginAuthDto) {
    return this.authService.loginClient(data);
  }

  @ApiHeaders([{ name: 'Authorization' }])
  @Post('verify')
  verifyClient(@Req() request: Request) {
    return this.authService.verify(request);
  }
}
