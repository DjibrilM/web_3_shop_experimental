import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  keyIdentifier: string;
  transaction: string;
}
