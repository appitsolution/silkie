import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Users, UsersSchema } from 'src/auth/schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Basket, BasketSchema } from './schemas/basket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: Basket.name, schema: BasketSchema },
    ]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
