import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  async create(dto: CreateReviewDto, userId: string | null = null): Promise<ReviewDocument> {
    const review = new this.reviewModel({ ...dto, userId });
    return review.save();
  }

  async findByProduct(productId: string): Promise<ReviewDocument[]> {
    return this.reviewModel
      .find({ productId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async getStats(productId: string): Promise<{ average: number; count: number; breakdown: Record<number, number> }> {
    const reviews = await this.reviewModel.find({ productId }).exec();
    const count = reviews.length;
    if (count === 0) return { average: 0, count: 0, breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    const breakdown: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;
    reviews.forEach((r) => { sum += r.rating; breakdown[r.rating] = (breakdown[r.rating] ?? 0) + 1; });
    return { average: Math.round((sum / count) * 10) / 10, count, breakdown };
  }
}
