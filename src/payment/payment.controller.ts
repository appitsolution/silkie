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
import { PaymentService } from './payment.service';
import { ApiHeader, ApiQuery } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiHeader({ name: 'Authorization' })
  @ApiQuery({ name: 'userId' })
  @Get('create')
  createOrder(@Query() args: { userId: string }, @Req() req: Request) {
    return this.paymentService.createOrder(args.userId, req);
  }

  @ApiQuery({ name: 'orderId' })
  @Get('accept')
  acceptOrder(@Query() args: { orderId: string }) {
    return this.paymentService.acceptOrder(args.orderId);
  }

  @ApiQuery({ name: 'orderId' })
  @Get('cancel')
  cancelOrder(@Query() args: { orderId: string }) {
    return this.paymentService.cancelOrder(args.orderId);
  }

  @ApiHeader({ name: 'Authorization' })
  @ApiQuery({ name: 'userId' })
  @Get('history')
  historyOrder(@Query() args: { userId: string }, @Req() req: Request) {
    return this.paymentService.historyOrder(args.userId, req);
  }
}
