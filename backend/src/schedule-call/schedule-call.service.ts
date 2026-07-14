import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleCall, ScheduleCallDocument } from './schemas/schedule-call.schema';
import { CreateScheduleCallDto } from './dto/create-schedule-call.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ScheduleCallService {
  constructor(
    @InjectModel(ScheduleCall.name) private scheduleCallModel: Model<ScheduleCallDocument>,
    private mailService: MailService,
  ) {}

  async create(dto: CreateScheduleCallDto): Promise<ScheduleCallDocument> {
    const scheduleCall = new this.scheduleCallModel(dto);
    const saved = await scheduleCall.save();

    void this.mailService.send(
      `New Schedule-a-Call request: ${dto.name}`,
      `
        <h2>New "Schedule a Call" request</h2>
        <p><strong>Name:</strong> ${dto.name}</p>
        <p><strong>Email:</strong> ${dto.email}</p>
        <p><strong>Phone:</strong> ${dto.phone ?? '—'}</p>
        <p><strong>Service:</strong> ${dto.service}</p>
        <p><strong>Message:</strong></p>
        <p>${dto.message}</p>
      `,
    );

    return saved;
  }

  async findAll(): Promise<ScheduleCallDocument[]> {
    return this.scheduleCallModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string): Promise<ScheduleCallDocument> {
    const updated = await this.scheduleCallModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Schedule call request not found');
    return updated;
  }
}
