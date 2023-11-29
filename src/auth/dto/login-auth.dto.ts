import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
