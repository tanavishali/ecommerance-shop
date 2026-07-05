import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateContactDto {
  @IsString() @MinLength(1) @MaxLength(80) name: string;
  @IsEmail() email: string;
  @IsString() @MinLength(1) @MaxLength(120) subject: string;
  @IsString() @MinLength(10) @MaxLength(2000) message: string;
}
