import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

const types = {
  userId: String,
  chickenNuggetsDates: [String],
  canjaDeGalinhaDates: [String],
  price: String,
};

@Schema({
  timestamps: true,
})
export class Basket {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: [types] })
  basket: [
    {
      userId: string;
      chickenNuggetsDates: [string];
      canjaDeGalinhaDates: [string];
      price: string;
    },
  ];
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
