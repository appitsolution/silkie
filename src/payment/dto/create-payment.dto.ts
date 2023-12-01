import { ApiProperty } from '@nestjs/swagger';

export class UpdateBasketDto {
  @ApiProperty({ required: true })
  userId: string;
}
