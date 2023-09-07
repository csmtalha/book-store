import { IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  publishedYear: number;

  @IsOptional()
  price: number;

  @IsOptional()
  stock: number;
}
