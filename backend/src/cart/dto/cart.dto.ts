import { IsString, IsNumber, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AddToCartDto {
  @IsString() productId: string;
  @IsNumber() @Min(1) quantity: number;
}

export class UpdateCartItemDto {
  @IsNumber() @Min(0) quantity: number;
}

export class MergeCartItemDto {
  @IsString() productId: string;
  @IsString() name: string;
  @IsNumber() price: number;
  @IsString() imageUrl: string;
  @IsNumber() @Min(1) quantity: number;
  @IsNumber() stock: number;
}

export class MergeCartDto {
  // Decorators are required: the global ValidationPipe runs with whitelist:true,
  // which strips any property that has no class-validator decorator.
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MergeCartItemDto)
  items: MergeCartItemDto[];
}
