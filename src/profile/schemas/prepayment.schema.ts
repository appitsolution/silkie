import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

const types = {
  active: Boolean,
  date: Array,
};

const values = {
  active: false,
  date: [],
};

interface SubscriptionDate {
  startDate: string;
  endDate: string;
}

@Schema({
  timestamps: true,
})
export class PrePayment {
  @Prop()
  userId: string;

  @Prop({ type: types, default: values })
  chickenNuggets: {
    active: boolean;
    date: SubscriptionDate[];
  };

  @Prop({ type: types, default: values })
  canjaDeGalinha: {
    active: boolean;
    date: SubscriptionDate[];
  };
}

export const PrePaymentSchema = SchemaFactory.createForClass(PrePayment);
