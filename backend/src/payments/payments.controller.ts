import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreateIntentDto } from './dto/create-intent.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a Stripe PaymentIntent and return clientSecret' })
  createIntent(@Body() dto: CreateIntentDto) {
    return this.paymentsService.createPaymentIntent(dto.amount, dto.currency);
  }
}
