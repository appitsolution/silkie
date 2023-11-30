import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationsDto } from './dto/update-notification.dto';
import { Notifications } from './schemas/notification.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/auth/schemas/users.schema';
import getBearerToken from 'src/methods/getBearerToken';
import { Request } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications.name)
    private notificationsModel: mongoose.Model<Notifications>,
    @InjectModel(Users.name) private usersModelData: mongoose.Model<Users>,
  ) {}
  async getNotifications(userId: string) {
    if (!userId) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const notificationUser = await this.notificationsModel.findOne({
        userId: userId,
      });
      if (!notificationUser) {
        return {
          code: 404,
          message: 'Not found',
        };
      }

      return {
        code: 200,
        notifications: notificationUser,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async editNotifications(data: UpdateNotificationsDto, req: Request) {
    const token = getBearerToken(req);
    if (!data.userId || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = jwt.verify(token, process.env.SECRET_KEY);
      const currentUser = await this.usersModelData.findOne({
        userId: login.id,
      });
      if (!currentUser) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      if (
        !Boolean(
          currentUser.connectUsers.includes(data.userId) ||
            currentUser.userId === data.userId,
        )
      ) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }
      const checkUser = await this.notificationsModel.findOne({
        userId: data.userId,
      });

      if (checkUser) {
        await this.notificationsModel.findOneAndUpdate(
          { userId: data.userId },
          data,
        );
        return {
          code: 200,
          message: 'notification update',
        };
      } else {
        await this.notificationsModel.create(data);
        return {
          code: 200,
          message: 'notification update',
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }
}
