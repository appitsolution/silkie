import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/constants/roles';

const standartType = {
  owner: Boolean,
  organizer: Boolean,
  reader: Boolean,
  user: Boolean,
};

const standartValue = {
  owner: false,
  organizer: false,
  reader: false,
  user: false,
};

@Schema({
  timestamps: true,
})
export class Permissions {
  @Prop()
  userId: string;

  @Prop({
    type: standartType,
    default: standartValue,
  })
  helpPanel: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  basket: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  users: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  profile: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  documentation: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  payments: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editEmail: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editPassword: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editMyEmail: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editMyPassword: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  createUser: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };

  @Prop({
    type: standartType,
    default: standartValue,
  })
  editRole: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  editPayment: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  createPay: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
  @Prop({
    type: standartType,
    default: standartValue,
  })
  deleteUser: {
    owner: boolean;
    organizer: boolean;
    reader: boolean;
    user: boolean;
  };
}

export const PermissionsSchema = SchemaFactory.createForClass(Permissions);
