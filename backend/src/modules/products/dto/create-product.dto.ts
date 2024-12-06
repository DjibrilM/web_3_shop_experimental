import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  owner: string;

  @IsUrl()
  imageUrl: string;
}
