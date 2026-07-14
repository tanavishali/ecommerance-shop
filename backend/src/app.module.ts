import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';
import { SeedModule } from './seed/seed.module';
import { UploadModule } from './upload/upload.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ContactModule } from './contact/contact.module';
import { ScheduleCallModule } from './schedule-call/schedule-call.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
    CartModule,
    SeedModule,
    UploadModule,
    PaymentsModule,
    ReviewsModule,
    ContactModule,
    ScheduleCallModule,
  ],
})
export class AppModule {}
