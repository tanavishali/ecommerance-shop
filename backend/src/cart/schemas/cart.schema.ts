import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ _id: false })
class CartItem {
  @Prop({ required: true }) productId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
  @Prop({ required: true }) imageUrl: string;
  @Prop({ required: true, min: 1 }) quantity: number;
  @Prop({ required: true }) stock: number;
}

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];

  @Prop({ default: 0 })
  total: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
CartSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
