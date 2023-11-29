import { Module } from '@nestjs/common';
import { ForgotService } from './forgot.service';
import { ForgotController } from './forgot.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/auth/schemas/users.schema';
import { Forgot, ForgotSchema } from './schemas/forgot.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema, collection: 'user' },
      {
        name: Forgot.name,
        schema: ForgotSchema,
        collection: 'forgot',
      },
    ]),
  ],
  controllers: [ForgotController],
  providers: [ForgotService],
})
export class ForgotModule {}
