import {
  Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto, MergeCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@CurrentUser() user: UserDocument) {
    return this.cartService.getCart(user._id.toString());
  }

  @Post('items')
  addItem(@CurrentUser() user: UserDocument, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(user._id.toString(), dto);
  }

  @Patch('items/:productId')
  updateItem(
    @CurrentUser() user: UserDocument,
    @Param('productId') productId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(user._id.toString(), productId, dto);
  }

  @Delete('items/:productId')
  removeItem(@CurrentUser() user: UserDocument, @Param('productId') productId: string) {
    return this.cartService.removeItem(user._id.toString(), productId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  clearCart(@CurrentUser() user: UserDocument) {
    return this.cartService.clearCart(user._id.toString());
  }

  @Post('merge')
  mergeCart(@CurrentUser() user: UserDocument, @Body() dto: MergeCartDto) {
    return this.cartService.mergeCart(user._id.toString(), dto);
  }
}
