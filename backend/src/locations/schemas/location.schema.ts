import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  // set when the ping came from a logged-in user, null for guests
  @Prop({ default: null }) userId: string | null;

  // client-generated id persisted in localStorage — identifies a guest's device
  @Prop({ default: null }) guestId: string | null;

  @Prop({ required: true }) latitude: number;
  @Prop({ required: true }) longitude: number;
  @Prop({ default: null }) accuracy: number | null;

  // storefront path the visitor was on when location was captured
  @Prop({ default: null }) path: string | null;
  @Prop({ default: null }) ip: string | null;
  @Prop({ default: null }) userAgent: string | null;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
LocationSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
