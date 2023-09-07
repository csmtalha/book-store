import { IsNotEmpty } from 'class-validator';

export class BuyRequestDto {
  @IsNotEmpty()
  numberOfBooks: number;
}
