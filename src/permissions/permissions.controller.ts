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
import { PermissionsService } from './permissions.service';
import { ApiQuery } from '@nestjs/swagger';
import { UpdatePermissionsDto } from './dto/update-permission.dto';
import { Request } from 'express';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiQuery({ name: 'userId' })
  @Get('one')
  getPermissions(@Query() args: { userId: string }) {
    return this.permissionsService.getPermissions(args.userId);
  }

  @Post('edit')
  editPermissions(@Body() data: UpdatePermissionsDto, @Req() req: Request) {
    return this.permissionsService.editPermissions(data, req);
  }
}
