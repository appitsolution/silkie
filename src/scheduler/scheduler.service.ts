import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as cron from 'node-cron';
import isDatePassed from 'src/methods/isDatePassed';
import { PrePayment } from 'src/profile/schemas/prepayment.schema';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectModel(PrePayment.name)
    private prePaymentModel: mongoose.Model<PrePayment>,
  ) {
    this.scheduleDailyTask();
  }

  private scheduleDailyTask() {
    cron.schedule('0 0 * * *', () => {
      this.dailyTask();
    });
  }

  private async dailyTask() {
    try {
      const allPrePayments = await this.prePaymentModel.find({
        $or: [
          { 'chickenNuggets.active': true },
          { 'canjaDeGalinha.active': true },
        ],
      });
      await Promise.all(
        allPrePayments.map(async (item) => {
          const chickenNuggetsFilter = item.chickenNuggets.date.filter(
            (date) => !isDatePassed(date.endDate),
          );

          const canjaDeGalinhaFilter = item.canjaDeGalinha.date.filter(
            (date) => !isDatePassed(date.endDate),
          );

          await this.prePaymentModel.findOneAndUpdate(
            { userId: item.userId },
            {
              chickenNuggets: {
                active: chickenNuggetsFilter.length !== 0,
                date: chickenNuggetsFilter,
              },
              canjaDeGalinha: {
                active: canjaDeGalinhaFilter.length !== 0,
                date: canjaDeGalinhaFilter,
              },
            },
          );
        }),
      );
    } catch (err) {
      console.log(err);
    }
    console.log('Выполняется каждый день в 00:00');
  }
}
