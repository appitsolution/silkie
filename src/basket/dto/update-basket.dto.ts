import { ApiProperty } from '@nestjs/swagger';

interface Type {
  userId: string;
  chickenNuggetsDates: string[];
  canjaDeGalinhaDates: string[];
}

const typeApi = {
  userId: { type: 'string' },
  chickenNuggetsDates: { type: 'array', default: [] },
  canjaDeGalinhaDates: { type: 'array', default: [] },
};

export class UpdateBasketDto {
  @ApiProperty({ required: true })
  userId: string;

  @ApiProperty({
    required: true,
    type: 'array',
    items: {
      type: 'object',
      properties: typeApi,
    },
  })
  basket: Type[];
}
