import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

const types = {
  userId: String,
  firstName: String,
  lastName: String,
  chickenNuggetsDates: [String],
  canjaDeGalinhaDates: [String],
  price: String,
};

@Schema({
  timestamps: true,
})
export class Payment {
  @Prop({ required: true })
  orderId: string;

  @Prop({ default: 'wait' })
  statusPayment: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, type: [types] })
  basket: [
    {
      userId: string;
      firstName: string;
      lastName: string;
      chickenNuggetsDates: [string];
      canjaDeGalinhaDates: [string];
      price: string;
    },
  ];

  @Prop({ required: true })
  totalPrice: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
