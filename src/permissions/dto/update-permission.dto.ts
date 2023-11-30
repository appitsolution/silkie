import { ApiProperty } from '@nestjs/swagger';

interface standartType {
  owner: boolean;
  organizer: boolean;
  reader: boolean;
  user: boolean;
}

const standartTypeApi = {
  owner: { type: 'boolean', default: false },
  organizer: { type: 'boolean', default: false },
  reader: { type: 'boolean', default: false },
  user: { type: 'boolean', default: false },
};

export class UpdatePermissionsDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  helpPanel: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  basket: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  users: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  profile: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  documentation: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  payments: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editEmail: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editPassword: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editMyEmail: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editMyPassword: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  createUser: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editRole: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  editPayment: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  createPay: standartType;

  @ApiProperty({ type: 'object', properties: standartTypeApi })
  deleteUser: standartType;
}
