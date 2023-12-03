import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';
import {
  PrePayment,
  PrePaymentSchema,
} from 'src/profile/schemas/prepayment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrePayment.name, schema: PrePaymentSchema },
    ]),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}
