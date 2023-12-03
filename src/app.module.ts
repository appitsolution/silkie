import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotModule } from './forgot/forgot.module';
import { PermissionsModule } from './permissions/permissions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './auth/entities/users.entity';
import { ProfileModule } from './profile/profile.module';
import { BasketModule } from './basket/basket.module';
import { PaymentModule } from './payment/payment.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auth',
      entities: [users],
      synchronize: false,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://test_education:Fm5xGy5NlfsDXhu0@cluster0.svrxsep.mongodb.net/plugin',
    ),

    AuthModule,
    ForgotModule,
    PermissionsModule,
    NotificationsModule,
    ProfileModule,
    BasketModule,
    PaymentModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
