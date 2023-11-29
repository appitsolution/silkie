import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

@Schema({
  timestamps: true,
})
export class Forgot {
  @Prop()
  userId: string;

  @Prop()
  code: string;
}

export const ForgotSchema = SchemaFactory.createForClass(Forgot);
