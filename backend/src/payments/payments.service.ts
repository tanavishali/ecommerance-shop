import { Injectable } from '@nestjs/common';
import Stripe = require('stripe');

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2026-06-24.dahlia',
    });
  }

  async createPaymentIntent(amount: number, currency = 'gbp') {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects pence/cents
      currency,
      automatic_payment_methods: { enabled: true },
    });
    return { clientSecret: paymentIntent.client_secret };
  }
}
