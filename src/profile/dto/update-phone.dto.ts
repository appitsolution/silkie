import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhoneDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  newPhone: string;
}
