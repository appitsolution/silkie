import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmailDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  newEmail: string;
}
