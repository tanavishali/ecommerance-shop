import { Controller, Post, Get, Body, Param, Request, UseGuards, Optional } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  @ApiOperation({ summary: 'Submit a product review (guest or logged-in)' })
  create(@Body() dto: CreateReviewDto, @Request() req: any) {
    const userId = req.user?._id?.toString() ?? null;
    const userName = req.user?.name ?? dto.userName;
    return this.reviewsService.create({ ...dto, userName }, userId);
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get all reviews for a product' })
  findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @Get(':productId/stats')
  @ApiOperation({ summary: 'Get rating stats for a product' })
  stats(@Param('productId') productId: string) {
    return this.reviewsService.getStats(productId);
  }
}
