import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto, UpdateCartItemDto, MergeCartDto } from './dto/cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productsService: ProductsService,
  ) {}

  private calcTotal(items: any[]): number {
    return Math.round(items.reduce((sum, i) => sum + i.price * i.quantity, 0) * 100) / 100;
  }

  async getCart(userId: string): Promise<CartDocument> {
    let cart = await this.cartModel.findOne({ userId: new Types.ObjectId(userId) }).exec();
    if (!cart) {
      cart = await this.cartModel.create({ userId: new Types.ObjectId(userId), items: [], total: 0 });
    }
    return cart;
  }

  async addItem(userId: string, dto: AddToCartDto): Promise<CartDocument> {
    const product = await this.productsService.findById(dto.productId);
    const cart = await this.getCart(userId);
    const existing = cart.items.find((i) => i.productId === dto.productId);
    if (existing) {
      existing.quantity = Math.min(existing.quantity + dto.quantity, product.stock);
    } else {
      cart.items.push({
        productId: dto.productId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: dto.quantity,
        stock: product.stock,
      });
    }
    cart.total = this.calcTotal(cart.items);
    cart.markModified('items');
    return cart.save();
  }

  async updateItem(userId: string, productId: string, dto: UpdateCartItemDto): Promise<CartDocument> {
    const cart = await this.getCart(userId);
    const idx = cart.items.findIndex((i) => i.productId === productId);
    if (idx === -1) throw new NotFoundException('Item not in cart');
    if (dto.quantity === 0) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = dto.quantity;
    }
    cart.total = this.calcTotal(cart.items);
    cart.markModified('items');
    return cart.save();
  }

  async removeItem(userId: string, productId: string): Promise<CartDocument> {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter((i) => i.productId !== productId);
    cart.total = this.calcTotal(cart.items);
    cart.markModified('items');
    return cart.save();
  }

  async clearCart(userId: string): Promise<void> {
    await this.cartModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { items: [], total: 0 },
    ).exec();
  }

  async mergeCart(userId: string, dto: MergeCartDto): Promise<CartDocument> {
    const cart = await this.getCart(userId);
    for (const guestItem of dto.items) {
      const existing = cart.items.find((i) => i.productId === guestItem.productId);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + guestItem.quantity, guestItem.stock);
      } else {
        cart.items.push(guestItem);
      }
    }
    cart.total = this.calcTotal(cart.items);
    cart.markModified('items');
    return cart.save();
  }
}
