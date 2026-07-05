import type { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: "1", name: "Wireless Noise-Cancelling Headphones", category: "Electronics",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res Audio support. Perfect for travel and work-from-home.",
    price: 179.99, originalPrice: 249.99, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    stock: 24, createdAt: "2024-10-01T10:00:00Z", updatedAt: "2024-10-01T10:00:00Z",
  },
  {
    _id: "2", name: "Smart Fitness Watch", category: "Electronics",
    description: "Track your health 24/7 with heart rate, sleep, SpO2 monitoring. GPS, 5ATM waterproof, 7-day battery. Compatible with iOS and Android.",
    price: 179.99, imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    stock: 15, createdAt: "2024-10-05T10:00:00Z", updatedAt: "2024-10-05T10:00:00Z",
  },
  {
    _id: "3", name: "Portable Bluetooth Speaker", category: "Electronics",
    description: "360° surround sound, IP67 waterproof, 20-hour playtime. Compact enough for outdoor adventures, powerful enough for house parties.",
    price: 89.99, imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    stock: 40, createdAt: "2024-10-08T10:00:00Z", updatedAt: "2024-10-08T10:00:00Z",
  },
  {
    _id: "4", name: "Men's Classic Oxford Shirt", category: "Clothing",
    description: "Tailored from 100% organic cotton. A wardrobe essential — sharp enough for the office, relaxed enough for weekends. Available in 6 colours.",
    price: 34.99, originalPrice: 54.99, imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
    stock: 80, createdAt: "2024-10-10T10:00:00Z", updatedAt: "2024-10-10T10:00:00Z",
  },
  {
    _id: "5", name: "Women's Merino Wool Jumper", category: "Clothing",
    description: "Ultra-soft superfine merino wool. Temperature-regulating, odour-resistant, and incredibly lightweight. Sustainably sourced.",
    price: 79.99, originalPrice: 119.99, imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    stock: 35, createdAt: "2024-10-12T10:00:00Z", updatedAt: "2024-10-12T10:00:00Z",
  },
  {
    _id: "6", name: "Running Trainers Pro", category: "Sports",
    description: "Engineered for performance runners. Carbon-fibre plate, responsive foam midsole, and mesh upper for breathability. Drop: 8mm.",
    price: 99.99, originalPrice: 144.99, imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    stock: 28, createdAt: "2024-10-14T10:00:00Z", updatedAt: "2024-10-14T10:00:00Z",
  },
  {
    _id: "7", name: "Atomic Habits — James Clear", category: "Books",
    description: "The #1 New York Times bestseller on building good habits and breaking bad ones. Over 15 million copies sold worldwide. Hardcover edition.",
    price: 14.99, imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop",
    stock: 120, createdAt: "2024-10-15T10:00:00Z", updatedAt: "2024-10-15T10:00:00Z",
  },
  {
    _id: "8", name: "The Design of Everyday Things", category: "Books",
    description: "Don Norman's seminal work on user-centred design. Essential reading for designers, engineers, and anyone who has ever been frustrated by a door handle.",
    price: 17.99, imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    stock: 55, createdAt: "2024-10-16T10:00:00Z", updatedAt: "2024-10-16T10:00:00Z",
  },
  {
    _id: "9", name: "Ceramic Pour-Over Coffee Set", category: "Home & Garden",
    description: "Hand-thrown ceramic dripper, carafe, and two mugs. The slow-coffee ritual, elevated. Dishwasher-safe glaze, microwave-safe.",
    price: 44.99, originalPrice: 64.99, imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    stock: 18, createdAt: "2024-10-17T10:00:00Z", updatedAt: "2024-10-17T10:00:00Z",
  },
  {
    _id: "10", name: "Indoor Plant Starter Kit", category: "Home & Garden",
    description: "Everything you need to start your indoor garden: 4 pots, premium potting mix, drainage trays, and a care guide. Plants not included.",
    price: 39.99, imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    stock: 60, createdAt: "2024-10-18T10:00:00Z", updatedAt: "2024-10-18T10:00:00Z",
  },
  {
    _id: "11", name: "Yoga Mat Pro — 6mm", category: "Sports",
    description: "Non-slip natural rubber base, microfibre top layer. Excellent grip wet or dry. Includes alignment lines and carry strap. 183cm × 61cm.",
    price: 49.99, originalPrice: 74.99, imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    stock: 45, createdAt: "2024-10-19T10:00:00Z", updatedAt: "2024-10-19T10:00:00Z",
  },
  {
    _id: "12", name: "Mechanical Keyboard TKL", category: "Electronics",
    description: "Tenkeyless layout with Cherry MX Brown switches. Hot-swappable PCB, per-key RGB, aluminium top case. Includes USB-C braided cable.",
    price: 89.99, originalPrice: 134.99, imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    stock: 22, createdAt: "2024-10-20T10:00:00Z", updatedAt: "2024-10-20T10:00:00Z",
  },
  {
    _id: "13", name: "Scented Soy Candle Set", category: "Home & Garden",
    description: "Set of 3 hand-poured soy wax candles. Fragrances: Cedarwood & Amber, Sea Salt & Driftwood, Bergamot & Neroli. 40-hour burn time each.",
    price: 34.99, imageUrl: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=400&h=400&fit=crop",
    stock: 70, createdAt: "2024-10-21T10:00:00Z", updatedAt: "2024-10-21T10:00:00Z",
  },
  {
    _id: "14", name: "Slim Leather Wallet", category: "Clothing",
    description: "Full-grain Italian leather, RFID-blocking lining. Holds 8 cards and cash. Gets better with age. Available in tan, black, and navy.",
    price: 49.99, imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    stock: 90, createdAt: "2024-10-22T10:00:00Z", updatedAt: "2024-10-22T10:00:00Z",
  },
  {
    _id: "15", name: "Deep Tissue Massage Gun", category: "Sports",
    description: "6 speed settings, 6 interchangeable heads, 3200 RPM max. Whisper-quiet motor. 6-hour battery. Carry case included.",
    price: 99.99, imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
    stock: 30, createdAt: "2024-10-23T10:00:00Z", updatedAt: "2024-10-23T10:00:00Z",
  },
  {
    _id: "16", name: "4K Webcam with Ring Light", category: "Electronics",
    description: "Sony sensor, autofocus, dual noise-cancelling mics. Built-in adjustable ring light. Plug-and-play USB-C. Works with all major platforms.",
    price: 109.99, imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
    stock: 19, createdAt: "2024-10-24T10:00:00Z", updatedAt: "2024-10-24T10:00:00Z",
  },
  {
    _id: "17", name: "Minimalist Wall Clock", category: "Home & Garden",
    description: "30cm silent sweep mechanism — no ticking. Powder-coated steel frame, printed dial. Suits any interior. Battery included.",
    price: 29.99, imageUrl: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
    stock: 50, createdAt: "2024-10-25T10:00:00Z", updatedAt: "2024-10-25T10:00:00Z",
  },
  {
    _id: "18", name: "Resistance Band Set (5 levels)", category: "Sports",
    description: "Natural latex bands across 5 resistance levels (10–50 lb). Includes carry bag and exercise guide. Safe for physiotherapy and strength training.",
    price: 24.99, imageUrl: "https://images.unsplash.com/photo-1598971457999-ca4ef48a9a71?w=400&h=400&fit=crop",
    stock: 100, createdAt: "2024-10-26T10:00:00Z", updatedAt: "2024-10-26T10:00:00Z",
  },
  {
    _id: "19", name: "Think Again — Adam Grant", category: "Books",
    description: "A powerful argument for rethinking what you know. Adam Grant explores the science of intellectual humility and the surprising joy of being wrong.",
    price: 13.99, imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    stock: 85, createdAt: "2024-10-27T10:00:00Z", updatedAt: "2024-10-27T10:00:00Z",
  },
  {
    _id: "20", name: "Linen Duvet Cover Set — King", category: "Home & Garden",
    description: "100% stonewashed French linen. Breathable, softens with every wash. Includes duvet cover + 2 pillowcases. Available in 8 colours.",
    price: 119.99, originalPrice: 189.99, imageUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    stock: 14, createdAt: "2024-10-28T10:00:00Z", updatedAt: "2024-10-28T10:00:00Z",
  },
];

// ─── Client-side filter/sort/paginate ────────────────────────────────────────

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}

export function filterProducts(filters: ProductFilters) {
  const {
    search = "",
    category = "",
    minPrice = 0,
    maxPrice = Infinity,
    sortBy = "newest",
    page = 1,
    limit = 12,
  } = filters;

  let results = [...MOCK_PRODUCTS];

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  if (sortBy === "price_asc") results.sort((a, b) => a.price - b.price);
  else if (sortBy === "price_desc") results.sort((a, b) => b.price - a.price);
  else results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const data = results.slice((safePage - 1) * limit, safePage * limit);

  return { data, total, page: safePage, limit, totalPages };
}

export function getProductById(id: string) {
  return MOCK_PRODUCTS.find((p) => p._id === id) ?? null;
}

export function getRelatedProducts(productId: string, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return MOCK_PRODUCTS.filter(
    (p) => p._id !== productId && p.category === product.category
  ).slice(0, limit);
}
