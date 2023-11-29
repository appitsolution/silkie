import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ required: true })
  role: string;

  @ApiProperty({ required: true })
  firstName: string;

  @ApiProperty({ required: true })
  lastName: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
