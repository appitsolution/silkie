import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Request } from 'express';
import { ApiQuery } from '@nestjs/swagger';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post('update')
  updateBasket(@Body() data: UpdateBasketDto, @Req() req: Request) {
    return this.basketService.updateBasket(data, req);
  }

  @ApiQuery({ name: 'userId' })
  @Get('one')
  getBasket(@Query() args: { userId: string }, @Req() req: Request) {
    return this.basketService.getBasket(args.userId, req);
  }
}
