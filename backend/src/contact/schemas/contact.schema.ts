import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) subject: string;
  @Prop({ required: true }) message: string;
  // null for guest submissions, set to the user's id when logged in
  @Prop({ default: null }) userId: string | null;
  @Prop({ default: 'new', enum: ['new', 'read', 'resolved'] }) status: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
ContactSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
