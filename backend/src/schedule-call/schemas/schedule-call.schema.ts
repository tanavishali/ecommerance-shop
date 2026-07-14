import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScheduleCallDocument = ScheduleCall & Document;

@Schema({ timestamps: true })
export class ScheduleCall {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) email: string;
  @Prop({ default: null }) phone: string | null;
  @Prop({ required: true }) service: string;
  @Prop({ required: true }) message: string;
  @Prop({ default: 'new', enum: ['new', 'contacted', 'resolved'] }) status: string;
}

export const ScheduleCallSchema = SchemaFactory.createForClass(ScheduleCall);
ScheduleCallSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
