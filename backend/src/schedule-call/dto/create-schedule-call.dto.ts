import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateScheduleCallDto {
  @IsString() @MinLength(1) @MaxLength(80) name: string;
  @IsEmail() email: string;
  @IsOptional() @IsString() @MaxLength(30) phone?: string;
  @IsString() @MinLength(1) @MaxLength(120) service: string;
  @IsString() @MinLength(10) @MaxLength(2000) message: string;
}
