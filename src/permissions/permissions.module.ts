import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permissions, PermissionsSchema } from './schemas/permission.schema';
import { Users, UsersSchema } from 'src/auth/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permissions.name, schema: PermissionsSchema },
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
