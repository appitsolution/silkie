import { Injectable } from '@nestjs/common';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Users } from 'src/auth/schemas/users.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Basket } from './schemas/basket.schema';
import getBearerToken from 'src/methods/getBearerToken';
import { Request } from 'express';
import getJwt from 'src/methods/getJwt';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Users.name) private usersModelData: mongoose.Model<Users>,
    @InjectModel(Basket.name) private basketModel: mongoose.Model<Basket>,
  ) {}
  async updateBasket(data: UpdateBasketDto, req: Request) {
    const token = getBearerToken(req);
    if (!data.userId || !data.basket || !token) {
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

      const result = await (async () => {
        const checkBasket = await this.basketModel.findOne({
          userId: data.userId,
        });
        if (checkBasket) {
          const basketPay = data.basket.map((item) => {
            return {
              ...item,
              price: String(
                item.canjaDeGalinhaDates.length * 100 +
                  item.chickenNuggetsDates.length * 100,
              ),
            };
          });
          await this.basketModel.findOneAndUpdate(
            { userId: data.userId },
            { userId: data.userId, basket: basketPay },
          );
          return { userId: data.userId, basket: basketPay };
        } else {
          const basketPay = data.basket.map((item) => {
            return {
              ...item,
              price: String(
                item.canjaDeGalinhaDates.length * 100 +
                  item.chickenNuggetsDates.length * 100,
              ),
            };
          });
          return await this.basketModel.create({
            userId: data.userId,
            basket: basketPay,
          });
        }
      })();

      return {
        code: 200,
        data: result,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }

  async getBasket(userId: string, req: Request) {
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

      if (currentUser.userId !== userId) {
        return {
          code: 403,
          message: 'You do not have permission',
        };
      }

      const result = await this.basketModel.findOne({ userId: userId });

      if (!result) {
        return {
          code: 404,
          message: 'basket not found',
        };
      }

      return {
        code: 200,
        data: result,
      };
    } catch (err) {
      return {
        code: 500,
        message: err,
      };
    }
  }
}
