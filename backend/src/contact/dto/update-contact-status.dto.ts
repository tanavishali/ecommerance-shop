import { IsIn } from 'class-validator';

export class UpdateContactStatusDto {
  @IsIn(['new', 'read', 'resolved']) status: string;
}
