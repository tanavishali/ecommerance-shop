import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(query: {
    search?: string;
    category?: string | string[];
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    limit?: number;
  }) {
    const { search, category, minPrice, maxPrice, sortBy = 'newest', page = 1, limit = 12 } = query;

    // Lazily expire sales so listings (storefront /sale, shop, admin) stay accurate.
    await this.revertExpiredSales();

    const filter: any = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (category) {
      const cats = Array.isArray(category) ? category : category.split(',').map((c) => c.trim());
      if (cats.length === 1) {
        filter.category = { $regex: `^${cats[0]}$`, $options: 'i' };
      } else if (cats.length > 1) {
        filter.category = { $in: cats.map((c) => new RegExp(`^${c}$`, 'i')) };
      }
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    const sortMap: Record<string, any> = {
      newest:     { createdAt: -1 },
      price_asc:  { price: 1 },
      price_desc: { price: -1 },
    };
    const sort = sortMap[sortBy] ?? { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      this.productModel.find(filter).sort(sort).skip(skip).limit(Number(limit)).exec(),
      this.productModel.countDocuments(filter).exec(),
    ]);

    return {
      data: data.map((p) => p.toJSON()),
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  async findById(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findRelated(id: string): Promise<ProductDocument[]> {
    const product = await this.findById(id);
    return this.productModel
      .find({ category: product.category, _id: { $ne: id } })
      .limit(4)
      .exec();
  }

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.productModel(dto);
    return product.save();
  }

  async update(id: string, dto: UpdateProductDto): Promise<ProductDocument> {
    const product = await this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Product not found');
  }

  // ── Sales ──────────────────────────────────────────────────────────────────

  /** Reverts any sales whose end date has passed: price ← originalPrice, clear sale. */
  async revertExpiredSales(): Promise<void> {
    await this.productModel.updateMany(
      { saleEndsAt: { $ne: null, $lte: new Date() } },
      [
        { $set: { price: { $ifNull: ['$originalPrice', '$price'] } } },
        { $set: { originalPrice: null, saleEndsAt: null } },
      ],
    );
  }

  /** Apply a % discount. Keeps the regular price in originalPrice and lowers price. */
  async applySale(id: string, discountPercent: number, saleEndsAt?: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');

    // Base off the regular price (originalPrice if already on sale, else current price).
    const regular = product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice
      : product.price;

    product.originalPrice = regular;
    product.price = Math.round(regular * (1 - discountPercent / 100) * 100) / 100;
    product.saleEndsAt = saleEndsAt ? new Date(saleEndsAt) : null;
    return product.save();
  }

  /** Remove a sale: restore the regular price and clear sale fields. */
  async removeSale(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');

    const updated = await this.productModel.findByIdAndUpdate(
      id,
      {
        $set: { price: product.originalPrice ?? product.price },
        $unset: { originalPrice: '', saleEndsAt: '' },
      },
      { new: true },
    ).exec();
    return updated as ProductDocument;
  }

  async count(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async insertMany(products: Partial<Product>[]): Promise<void> {
    await this.productModel.insertMany(products);
  }
}
