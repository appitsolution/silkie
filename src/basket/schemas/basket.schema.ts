import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

const types = {
  userId: String,
  chickenNuggetsDates: [String],
  canjaDeGalinhaDates: [String],
  price: String,
};

type Types = typeof types;
@Schema({
  timestamps: true,
})
export class Basket {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: [types], default: [] })
  basket: Types[];
}

export const BasketSchema = SchemaFactory.createForClass(Basket);
