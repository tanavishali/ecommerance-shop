import { IsIn } from 'class-validator';

export class UpdateScheduleCallStatusDto {
  @IsIn(['new', 'contacted', 'resolved']) status: string;
}
