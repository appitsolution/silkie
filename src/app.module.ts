import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgotModule } from './forgot/forgot.module';
import { PermissionsModule } from './permissions/permissions.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://test_education:Fm5xGy5NlfsDXhu0@cluster0.svrxsep.mongodb.net/auth',
    ),
    MongooseModule.forRoot(
      'mongodb+srv://test_education:Fm5xGy5NlfsDXhu0@cluster0.svrxsep.mongodb.net/plugin',
    ),
    AuthModule,
    ForgotModule,
    PermissionsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
