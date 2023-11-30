import { Injectable } from '@nestjs/common';
import { CreateForgotDto } from './dto/create-forgot.dto';
import { UpdateForgotDto } from './dto/update-forgot.dto';
import { Users } from 'src/auth/schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Forgot } from './schemas/forgot.schema';
import generateRandomCode from 'src/methods/generateRandomCode';
import generateTemporaryPassword from 'src/methods/generateTemporaryPassword';
import { users } from 'src/auth/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class ForgotService {
  constructor(
    @InjectRepository(users)
    private readonly usersModule: Repository<users>,
    @InjectModel(Forgot.name) private forgotModel: mongoose.Model<Forgot>,
  ) {}

  async checkEmail(email: string) {
    if (!email) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkUser = await this.usersModule.findOne({
        where: { email: email },
      });

      if (!checkUser) {
        return {
          code: 404,
          message: 'Not found',
        };
      }

      const checkForgot = await this.forgotModel.findOne({
        userId: checkUser.id,
      });
      const code = generateRandomCode();
      if (checkForgot) {
        await this.forgotModel.findOneAndUpdate(
          { _id: checkForgot._id },
          {
            code: code,
          },
        );
        return {
          code: 200,
          message: 'ok',
        };
      } else {
        await this.forgotModel.create({ userId: checkUser.id, code: code });

        return {
          code: 200,
          message: 'ok',
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async resetPassword(userId: string, code: string) {
    if (!userId || !code) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkForgot = await this.forgotModel.findOne({ userId: userId });

      if (!checkForgot) {
        return {
          code: 404,
          message: 'Not found',
        };
      }

      if (checkForgot.code !== code) {
        return {
          code: 400,
          message: 'code is not correct',
        };
      }

      const temporaryPassword = generateTemporaryPassword();

      await this.usersModule.update(
        { id: userId },
        { password: bcrypt.hashSync(temporaryPassword) },
      );

      await this.forgotModel.findOneAndDelete({ _id: checkForgot._id });

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
}
