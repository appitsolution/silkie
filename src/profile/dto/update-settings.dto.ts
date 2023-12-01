import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  language: string;

  @ApiProperty({ required: true })
  currency: string;
}
