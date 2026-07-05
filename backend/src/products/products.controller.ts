import {
  Controller, Get, Post, Put, Delete, Body, Param, Query,
  UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApplySaleDto } from './dto/apply-sale.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Public: list products
  @Get()
  findAll(@Query() query: any) {
    return this.productsService.findAll(query);
  }

  // Public: single product
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  // Public: related products
  @Get(':id/related')
  findRelated(@Param('id') id: string) {
    return this.productsService.findRelated(id);
  }

  // Admin: create
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  // Admin: update
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  // Admin: delete
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // Admin: apply a sale (discount % + optional end date)
  @Post(':id/sale')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  applySale(@Param('id') id: string, @Body() dto: ApplySaleDto) {
    return this.productsService.applySale(id, dto.discountPercent, dto.saleEndsAt);
  }

  // Admin: remove a sale (restore regular price)
  @Delete(':id/sale')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  removeSale(@Param('id') id: string) {
    return this.productsService.removeSale(id);
  }
}
