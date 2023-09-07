import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  publishedYear: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;
}
