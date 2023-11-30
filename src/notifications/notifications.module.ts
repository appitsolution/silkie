import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notifications,
  NotificationsSchema,
} from './schemas/notification.schema';
import { Users, UsersSchema } from 'src/auth/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notifications.name, schema: NotificationsSchema },

      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
