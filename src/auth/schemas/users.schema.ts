import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({ default: Role.OWNER })
  role: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'USD' })
  currentCurrency: string;

  @Prop({ default: 'UA' })
  currentLang: string;

  @Prop({ default: [] })
  connectUsers: [string];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
