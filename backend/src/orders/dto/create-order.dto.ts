import { IsArray, IsObject, IsString, IsNumber, IsOptional, IsIn, Min, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString() productId: string;
  @IsNumber() @Min(1) quantity: number;
}

class ShippingAddressDto {
  @IsString() fullName: string;
  @IsString() address: string;
  @IsString() city: string;
  @IsString() postcode: string;
  @IsString() country: string;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsOptional()
  @IsString()
  paymentIntentId?: string;

  @IsOptional()
  @IsIn(['card', 'cod'])
  paymentMethod?: string;
}
