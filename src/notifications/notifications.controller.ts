import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiQuery } from '@nestjs/swagger';
import { UpdateNotificationsDto } from './dto/update-notification.dto';
import { Request } from 'express';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiQuery({ name: 'userId' })
  @Get('one')
  getNotifications(@Query() args: { userId: string }) {
    return this.notificationsService.getNotifications(args.userId);
  }

  @Post('edit')
  editNotifications(@Body() data: UpdateNotificationsDto, @Req() req: Request) {
    return this.notificationsService.editNotifications(data, req);
  }
}
