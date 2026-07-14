import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleCallController } from './schedule-call.controller';
import { ScheduleCallService } from './schedule-call.service';
import { ScheduleCall, ScheduleCallSchema } from './schemas/schedule-call.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScheduleCall.name, schema: ScheduleCallSchema }]),
    MailModule,
  ],
  controllers: [ScheduleCallController],
  providers: [ScheduleCallService],
})
export class ScheduleCallModule {}
