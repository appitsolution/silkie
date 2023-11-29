import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import mongoose from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request } from 'express';
import getBearerToken from 'src/methods/getBearerToken';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private authModel: mongoose.Model<Users>,
  ) {}

  async create(data: CreateAuthDto) {
    if (!data.email || !data.firstName || !data.lastName || !data.password) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkUser = await this.authModel.findOne({ email: data.email });
      if (checkUser) {
        return {
          code: 409,
          message: 'This user already exists',
        };
      }

      const result = await this.authModel.create({
        ...data,
        password: bcrypt.hashSync(data.password),
      });

      return {
        code: 201,
        data: result,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async loginClient(data: LoginAuthDto) {
    if (!data.email || !data.password) {
      return {
        code: 400,
        message: 'Not all arguments',
      };
    }

    try {
      const checkUser = await this.authModel.findOne({
        email: data.email,
      });

      if (!checkUser) {
        return {
          code: 404,
          message: 'Not Found',
        };
      }

      if (bcrypt.compareSync(data.password, checkUser.password)) {
        return {
          code: 200,
          token: jwt.sign(
            { id: checkUser.id, role: checkUser.role },
            process.env.SECRET_KEY,
          ),
        };
      } else {
        return {
          code: 400,
          message: 'Password is not correct',
        };
      }
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async verify(req: Request) {
    const token = getBearerToken(req);

    try {
      if (!token) {
        return {
          code: 400,
          message: 'Not all arguments',
        };
      }
      const login = jwt.verify(token, process.env.SECRET_KEY);
      const checkUser = await this.authModel.findOne({ _id: login.id });

      if (checkUser) {
        return {
          code: 200,
          data: checkUser,
        };
      }

      return {
        code: 404,
        message: 'Not Found',
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }
}
