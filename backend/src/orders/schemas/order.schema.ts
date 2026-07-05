import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

@Schema({ _id: false })
class OrderItem {
  @Prop({ required: true }) productId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
  @Prop({ required: true, min: 1 }) quantity: number;
  @Prop({ required: true }) imageUrl: string;
}

@Schema({ _id: false })
class ShippingAddress {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true }) address: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) postcode: string;
  @Prop({ required: true }) country: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  userId: Types.ObjectId | null;

  @Prop({ type: [OrderItem], required: true })
  items: OrderItem[];

  @Prop({ type: ShippingAddress, required: true })
  shippingAddress: ShippingAddress;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ default: 'pending', enum: ['pending','processing','shipped','delivered','cancelled'] })
  status: OrderStatus;

  @Prop({ default: 'pending', enum: ['pending','paid','failed'] })
  paymentStatus: string;

  @Prop({ default: 'card', enum: ['card','cod'] })
  paymentMethod: string;

  @Prop()
  paymentIntentId?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => { delete ret.__v; return ret; },
});
