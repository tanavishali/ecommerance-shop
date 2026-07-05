import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true }) productId: string;
  @Prop({ required: true, min: 1, max: 5 }) rating: number;
  @Prop({ default: '' }) comment: string;
  @Prop({ required: true }) userName: string;
  @Prop({ default: null }) userId: string | null;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
