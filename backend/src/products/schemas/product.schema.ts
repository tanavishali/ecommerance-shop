import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0 })
  originalPrice: number;

  // When set, the sale auto-reverts (price ← originalPrice) after this time.
  @Prop({ default: null })
  saleEndsAt: Date | null;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, trim: true })
  category: string;

  @Prop({ required: true, default: 0, min: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
