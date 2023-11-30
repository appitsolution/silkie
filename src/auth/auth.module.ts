import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, Users } from './schemas/users.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([users]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
