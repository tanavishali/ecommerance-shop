import { IsNumber, Min, Max, IsOptional, IsDateString } from 'class-validator';

export class ApplySaleDto {
  @IsNumber()
  @Min(1)
  @Max(95)
  discountPercent: number;

  // Optional ISO date string; when omitted the sale has no expiry.
  @IsOptional()
  @IsDateString()
  saleEndsAt?: string;
}
