import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop({ required: true })
  userId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: '' })
  phone: '';

  @Prop({ default: 'USD' })
  currentCurrency: string;

  @Prop({ default: 'UA' })
  currentLang: string;

  @Prop({ default: [] })
  connectUsers: [string];
}

export const UsersSchema = SchemaFactory.createForClass(Users);
