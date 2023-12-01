import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

const types = {
  active: Boolean,
  endDate: Array,
};

const values = {
  active: false,
  endDate: [],
};
@Schema({
  timestamps: true,
})
export class PrePayment {
  @Prop()
  userId: string;

  @Prop({ type: types, default: values })
  chickenNuggets: {
    active: boolean;
    endDate: [string];
  };

  @Prop({ type: types, default: values })
  canjaDeGalinha: {
    active: boolean;
    endDate: [string];
  };
}

export const PrePaymentSchema = SchemaFactory.createForClass(PrePayment);
