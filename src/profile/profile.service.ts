import { Injectable } from '@nestjs/common';
import { Users } from 'src/auth/schemas/users.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import getBearerToken from 'src/methods/getBearerToken';
import { Request } from 'express';
import getJwt from 'src/methods/getJwt';
import { users } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import generateRandomId from 'src/methods/generateRandomId';
import { Role } from 'src/constants/roles';
import { PrePayment } from './schemas/prepayment.schema';
import { UpdateSettingsDto } from './dto/update-settings.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Users.name) private usersModelData: mongoose.Model<Users>,
    @InjectModel(PrePayment.name)
    private prepaymentModel: mongoose.Model<PrePayment>,
    @InjectRepository(users)
    private readonly usersModule: Repository<users>,
  ) {}

  async getDataProfile(userId: string, req: Request) {
    const token = getBearerToken(req);
    if (!userId || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

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
          currentUser.connectUsers.includes(userId) ||
            currentUser.userId === userId,
        )
      ) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }

      const userData = await this.usersModelData
        .findOne({ userId: userId })
        .select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
        .lean()
        .exec();

      const prepayment = await this.prepaymentModel.findOne({ userId: userId });

      const userNative = await this.usersModule.findOne({
        where: {
          id: userId,
        },
        select: ['email', 'role'],
      });

      return {
        code: 200,
        profile: {
          ...userData,
          email: userNative.email,
          role: userNative.role,
          prepayment,
        },
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async getDataProfileAll(userId: string, req: Request) {
    const token = getBearerToken(req);
    if (!userId || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

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
          currentUser.connectUsers.includes(userId) ||
            currentUser.userId === userId,
        )
      ) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }

      const userDataCurrent = await this.usersModelData.findOne({
        userId: userId,
      });

      const users = await Promise.all(
        userDataCurrent.connectUsers.map(async (item) => {
          const user = await this.usersModelData
            .findOne({ userId: item })
            .select({ _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
            .lean()
            .exec();
          const prepayment = await this.prepaymentModel.findOne({
            userId: item,
          });

          const userNative = await this.usersModule.findOne({
            where: {
              id: item,
            },
            select: ['email', 'role'],
          });
          return {
            ...user,
            email: userNative.email,
            role: userNative.role,
            prepayment,
          };
        }),
      );

      return {
        code: 200,
        users,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async editEmail(data: UpdateEmailDto, req: Request) {
    const token = getBearerToken(req);
    if (!data.userId || !data.newEmail || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

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

      await this.usersModule.update(
        { id: data.userId },
        { email: data.newEmail },
      );

      return {
        code: 200,
        message: 'update email',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async editPhone(data: UpdatePhoneDto, req: Request) {
    const token = getBearerToken(req);
    if (!data.userId || !data.newPhone || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

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

      await this.usersModelData.findOneAndUpdate(
        { id: data.userId },
        { phone: data.newPhone },
      );

      return {
        code: 200,
        message: 'update phone',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async editPassword(data: UpdatePasswordDto, req: Request) {
    const token = getBearerToken(req);
    if (!data.userId || !data.newPassword || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

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

      await this.usersModule.update(
        { id: data.userId },
        { password: data.newPassword },
      );

      return {
        code: 200,
        message: 'update password',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async editSettings(data: UpdateSettingsDto, req: Request) {
    const token = getBearerToken(req);
    if (!data.userId || !data.currency || !data.language || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      const currentUser = await this.usersModelData.findOne({
        userId: login.id,
      });

      if (!currentUser) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      if (currentUser.userId !== data.userId) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }

      await this.usersModelData.findOneAndUpdate(
        { userId: data.userId },
        { currentCurrency: data.currency, currentLang: data.language },
      );

      return {
        code: 200,
        message: 'update settings',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async deleteProfile(userId: string, req: Request) {
    const token = getBearerToken(req);

    if (!userId || !token) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      const currentUser = await this.usersModelData.findOne({
        userId: login.id,
      });

      if (!currentUser) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      // if (currentUser.userId === userId) {
      //   return {
      //     code: 403,
      //     message: 'You cannot delete yourself',
      //   };
      // }

      if (
        !Boolean(
          currentUser.connectUsers.includes(userId) ||
            currentUser.userId === userId,
        )
      ) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }

      const user = await this.usersModelData.findOne({ userId: userId });

      await Promise.all(
        user.connectUsers.map(async (item) => {
          await this.usersModelData.findOneAndDelete({ userId: item });
          await this.usersModule.delete({ id: item });
        }),
      );

      await this.usersModelData.findOneAndDelete({ userId: userId });
      await this.usersModule.delete({ id: userId });

      return {
        code: 200,
        message: 'ok',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async createNewProfile(data: CreateProfileDto, req: Request) {
    const token = getBearerToken(req);

    if (
      !data.email ||
      !data.firstName ||
      !data.lastName ||
      !data.password ||
      !token
    ) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    if (!Object.values(Role).includes(data.role)) {
      return {
        code: 400,
        message: 'role is not correct',
      };
    }

    try {
      const login = getJwt(token);
      if (!login) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      const currentUser = await this.usersModelData.findOne({
        userId: login.id,
      });

      if (!currentUser) {
        return {
          code: 404,
          message: 'user not found',
        };
      }

      if (currentUser.userId !== data.userId) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }

      if (currentUser.connectUsers.length >= 4) {
        return {
          code: 403,
          message: 'Max users',
        };
      }

      const checkUser = await this.usersModule.findOne({
        where: { email: data.email },
      });

      if (checkUser) {
        return {
          code: 409,
          message: 'This user already exists',
        };
      }

      const generateId = generateRandomId();

      const result = await this.usersModule.save(
        this.usersModule.create({
          id: generateId,
          role: data.role,
          email: data.email,
          password: bcrypt.hashSync(data.password),
        }),
      );

      await this.usersModelData.findOneAndUpdate(
        { userId: currentUser.userId },
        {
          connectUsers: [...currentUser.connectUsers, generateId],
        },
      );

      await this.usersModelData.create({
        userId: generateId,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });

      return {
        code: 201,
        data: result,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        message: err,
      };
    }
  }
}
