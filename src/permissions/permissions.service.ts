import { Injectable } from '@nestjs/common';
import { Permissions } from './schemas/permission.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdatePermissionsDto } from './dto/update-permission.dto';
import { Request } from 'express';
import getBearerToken from 'src/methods/getBearerToken';
import { Users } from 'src/auth/schemas/users.schema';
const jwt = require('jsonwebtoken');

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permissions.name)
    private permissionsModel: mongoose.Model<Permissions>,
    @InjectModel(Users.name) private usersModelData: mongoose.Model<Users>,
  ) {}

  async getPermissions(userId: string) {
    if (!userId) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const permissionUser = await this.permissionsModel.findOne({
        userId: userId,
      });
      if (!permissionUser) {
        return {
          code: 404,
          message: 'Not found',
        };
      }

      return {
        code: 200,
        permissions: permissionUser,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async editPermissions(data: UpdatePermissionsDto, req: Request) {
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

      const checkUser = await this.permissionsModel.findOne({
        userId: data.userId,
      });

      if (checkUser) {
        await this.permissionsModel.findOneAndUpdate(
          { userId: data.userId },
          data,
        );
        return {
          code: 200,
          message: 'permission update',
        };
      } else {
        await this.permissionsModel.create(data);
        return {
          code: 200,
          message: 'permission update',
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
