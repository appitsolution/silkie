import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

const standartType = {
  email: Boolean,
  telegram: Boolean,
  whatsapp: Boolean,
};

const standartValue = {
  email: false,
  telegram: false,
  whatsapp: false,
};

const standartPrePaymentsType = {
  one: standartType,
  two: standartType,
  three: standartType,
};

const standartPrePaymentsValue = {
  one: standartValue,
  two: standartValue,
  three: standartValue,
};

@Schema({
  timestamps: true,
})
export class Notifications {
  @Prop()
  userId: string;

  @Prop({
    type: standartType,
    default: standartValue,
  })
  createProfile: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  deleteProfile: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editPayment: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  infoPayment: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  reminder: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  prepayments: {
    one: {
      email: boolean;
      telegram: boolean;
      whatsapp: boolean;
    };
    two: {
      email: boolean;
      telegram: boolean;
      whatsapp: boolean;
    };
    three: {
      email: boolean;
      telegram: boolean;
      whatsapp: boolean;
    };
  };
  @Prop({
    type: standartPrePaymentsType,
    default: standartPrePaymentsValue,
  })
  haveDontPay: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editEmail: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editPassword: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  addUser: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  deleteUser: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editEmailExceptOwner: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editPasswordExceptOwner: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  rolePasswordExceptOwner: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
