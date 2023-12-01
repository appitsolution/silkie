import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({ required: true })
  newPassword: string;
}
