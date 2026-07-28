import { IsNumber, IsString, IsOptional, Min, Max, MaxLength } from 'class-validator';

export class CreateLocationDto {
  @IsNumber() @Min(-90) @Max(90) latitude: number;
  @IsNumber() @Min(-180) @Max(180) longitude: number;

  @IsOptional() @IsNumber() accuracy?: number;

  // required for guests so repeat pings from the same device update the same record
  @IsOptional() @IsString() @MaxLength(100) guestId?: string;

  @IsOptional() @IsString() @MaxLength(300) path?: string;
}
