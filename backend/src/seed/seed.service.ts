import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

const SEED_PRODUCTS = [
  { name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio support.', price: 179.99, originalPrice: 249.99, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', stock: 24 },
  { name: 'Smart Fitness Watch', category: 'Electronics', description: 'Track your health 24/7 with heart rate, sleep, SpO2 monitoring. GPS, 5ATM waterproof, 7-day battery.', price: 179.99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', stock: 15 },
  { name: 'Portable Bluetooth Speaker', category: 'Electronics', description: '360° surround sound, IP67 waterproof, 20-hour playtime.', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', stock: 40 },
  { name: "Men's Classic Oxford Shirt", category: 'Clothing', description: 'Tailored from 100% organic cotton. A wardrobe essential.', price: 34.99, originalPrice: 54.99, imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop', stock: 80 },
  { name: "Women's Merino Wool Jumper", category: 'Clothing', description: 'Ultra-soft superfine merino wool. Temperature-regulating, odour-resistant.', price: 79.99, originalPrice: 119.99, imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', stock: 35 },
  { name: 'Running Trainers Pro', category: 'Sports', description: 'Engineered for performance runners. Carbon-fibre plate, responsive foam midsole.', price: 99.99, originalPrice: 144.99, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', stock: 28 },
  { name: 'Atomic Habits — James Clear', category: 'Books', description: 'The #1 New York Times bestseller on building good habits.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop', stock: 120 },
  { name: 'The Design of Everyday Things', category: 'Books', description: "Don Norman's seminal work on user-centred design.", price: 17.99, imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop', stock: 55 },
  { name: 'Ceramic Pour-Over Coffee Set', category: 'Home & Garden', description: 'Hand-thrown ceramic dripper, carafe, and two mugs.', price: 44.99, originalPrice: 64.99, imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', stock: 18 },
  { name: 'Indoor Plant Starter Kit', category: 'Home & Garden', description: '4 pots, premium potting mix, drainage trays, and a care guide.', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', stock: 60 },
  { name: 'Yoga Mat Pro — 6mm', category: 'Sports', description: 'Non-slip natural rubber base, microfibre top layer. 183cm × 61cm.', price: 49.99, originalPrice: 74.99, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', stock: 45 },
  { name: 'Mechanical Keyboard TKL', category: 'Electronics', description: 'Tenkeyless layout with Cherry MX Brown switches. Hot-swappable PCB, per-key RGB.', price: 89.99, originalPrice: 134.99, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', stock: 22 },
  { name: 'Scented Soy Candle Set', category: 'Home & Garden', description: 'Set of 3 hand-poured soy wax candles. 40-hour burn time each.', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop', stock: 70 },
  { name: 'Slim Leather Wallet', category: 'Clothing', description: 'Full-grain Italian leather, RFID-blocking lining. Holds 8 cards and cash.', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop', stock: 90 },
  { name: 'Deep Tissue Massage Gun', category: 'Sports', description: '6 speed settings, 6 interchangeable heads, 3200 RPM max.', price: 99.99, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', stock: 30 },
  { name: '4K Webcam with Ring Light', category: 'Electronics', description: 'Sony sensor, autofocus, dual noise-cancelling mics. Built-in adjustable ring light.', price: 109.99, imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop', stock: 19 },
  { name: 'Minimalist Wall Clock', category: 'Home & Garden', description: '30cm silent sweep mechanism. Powder-coated steel frame.', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop', stock: 50 },
  { name: 'Resistance Band Set (5 levels)', category: 'Sports', description: 'Natural latex bands across 5 resistance levels (10–50 lb).', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=400&h=400&fit=crop', stock: 100 },
  { name: 'Think Again — Adam Grant', category: 'Books', description: 'A powerful argument for rethinking what you know.', price: 13.99, imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop', stock: 85 },
  { name: 'Linen Duvet Cover Set — King', category: 'Home & Garden', description: '100% stonewashed French linen. Breathable, softens with every wash.', price: 119.99, originalPrice: 189.99, imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop', stock: 14 },
];

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async onApplicationBootstrap() {
    await this.seedAdmin();
    await this.seedProducts();
  }

  private async seedAdmin() {
    const existing = await this.usersService.findByEmail('admin@shop.com');
    if (existing) return;
    const hashed = await bcrypt.hash('admin123', 10);
    await this.usersService.create({ name: 'Admin', email: 'admin@shop.com', password: hashed, role: 'admin' });
    // Also seed a demo customer
    const customer = await this.usersService.findByEmail('customer@shop.com');
    if (!customer) {
      const ch = await bcrypt.hash('customer123', 10);
      await this.usersService.create({ name: 'Demo Customer', email: 'customer@shop.com', password: ch, role: 'user' });
    }
    this.logger.log('✅ Admin and demo customer seeded');
  }

  private async seedProducts() {
    const count = await this.productsService.count();
    if (count > 0) return;
    await this.productsService.insertMany(SEED_PRODUCTS);
    this.logger.log(`✅ ${SEED_PRODUCTS.length} products seeded`);
  }
}
