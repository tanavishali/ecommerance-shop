import { IsString, IsNumber, IsOptional, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateReviewDto {
  @IsString() productId: string;
  @IsNumber() @Min(1) @Max(5) rating: number;
  @IsOptional() @IsString() @MaxLength(500) comment?: string;
  @IsString() @MinLength(1) @MaxLength(60) userName: string;
}
