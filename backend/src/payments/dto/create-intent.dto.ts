import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIntentDto {
  @ApiProperty({ example: 109.99 })
  @IsNumber()
  @Min(0.5)
  amount: number;

  @ApiProperty({ example: 'gbp', required: false })
  @IsOptional()
  @IsString()
  currency?: string;
}
