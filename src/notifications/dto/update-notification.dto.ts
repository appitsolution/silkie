import { ApiProperty } from '@nestjs/swagger';

const standartTypeApi = {
  owner: { type: 'boolean', default: false },
  organizer: { type: 'boolean', default: false },
  reader: { type: 'boolean', default: false },
  user: { type: 'boolean', default: false },
};

const standartPrePaymentsType = {
  one: { type: 'object', properties: standartTypeApi },
  two: { type: 'object', properties: standartTypeApi },
  three: { type: 'object', properties: standartTypeApi },
};

export class UpdateNotificationsDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  createProfile: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  deleteProfile: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editPayment: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  infoPayment: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  reminder: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartPrePaymentsType })
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
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  haveDontPay: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editEmail: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editPassword: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  addUser: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  deleteUser: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editEmailExceptOwner: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editPasswordExceptOwner: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
  @ApiProperty({ type: 'object', properties: standartTypeApi })
  rolePasswordExceptOwner: {
    email: boolean;
    telegram: boolean;
    whatsapp: boolean;
  };
}
