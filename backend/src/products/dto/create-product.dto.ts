import { IsString, IsNumber, IsUrl, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  originalPrice?: number;

  @IsString()
  imageUrl: string;

  @IsString()
  category: string;

  @IsNumber()
  @Min(0)
  stock: number;
}
