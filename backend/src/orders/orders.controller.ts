import {
  Controller, Get, Post, Patch, Body, Param, UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserDocument } from '../users/schemas/user.schema';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // Guest: create order without auth (after Stripe payment)
  @Post('guest')
  createGuest(@Body() dto: CreateOrderDto) {
    return this.ordersService.createGuest(dto);
  }

  // User: create order
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: UserDocument, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user._id.toString(), dto);
  }

  // User: their own orders
  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMine(@CurrentUser() user: UserDocument) {
    return this.ordersService.findMyOrders(user._id.toString());
  }

  // Admin: all orders
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  findAll() {
    return this.ordersService.findAll();
  }

  // User or Admin: single order
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @CurrentUser() user: UserDocument) {
    const isAdmin = user.role === 'admin';
    return this.ordersService.findById(id, user._id.toString(), isAdmin);
  }

  // Admin: update order status
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
