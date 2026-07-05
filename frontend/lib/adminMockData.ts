import { MOCK_PRODUCTS } from "@/lib/mockData";
import type { Product } from "@/types";

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export const ADMIN_STATS = {
  totalRevenue: 48320,
  totalOrders:  312,
  activeProducts: 20,
  newCustomers: 87,
  revenueChange:  +12.4,
  ordersChange:   +8.1,
  productsChange: +5.0,
  customersChange: +23.5,
};

// ─── Sales by day (last 7 days) ───────────────────────────────────────────────

export const SALES_BY_DAY = [
  { date: "Mon", revenue: 4200, orders: 18 },
  { date: "Tue", revenue: 6800, orders: 27 },
  { date: "Wed", revenue: 5100, orders: 22 },
  { date: "Thu", revenue: 7300, orders: 31 },
  { date: "Fri", revenue: 8900, orders: 38 },
  { date: "Sat", revenue: 9400, orders: 42 },
  { date: "Sun", revenue: 6620, orders: 29 },
];

// ─── Orders by status ────────────────────────────────────────────────────────

export const ORDERS_BY_STATUS_DATA = [
  { status: "Pending",    count: 42, color: "#F59E0B" },
  { status: "Processing", count: 67, color: "#3B82F6" },
  { status: "Shipped",    count: 89, color: "#8B5CF6" },
  { status: "Delivered",  count: 98, color: "#10B981" },
  { status: "Cancelled",  count: 16, color: "#EF4444" },
];

// ─── Top products ─────────────────────────────────────────────────────────────

export const TOP_PRODUCTS_DATA = [
  { productId: "1",  name: "Wireless Noise-Cancelling Headphones", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop", totalSold: 94,  revenue: 16919.06 },
  { productId: "5",  name: "Women's Merino Wool Jumper",           imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&h=80&fit=crop", totalSold: 78,  revenue: 6239.22  },
  { productId: "6",  name: "Running Trainers Pro",                 imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop", totalSold: 65,  revenue: 6499.35  },
  { productId: "12", name: "Mechanical Keyboard TKL",              imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=80&h=80&fit=crop", totalSold: 52,  revenue: 4679.48  },
  { productId: "2",  name: "Smart Fitness Watch",                  imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop", totalSold: 43,  revenue: 7739.57  },
];

// ─── Admin orders ─────────────────────────────────────────────────────────────

export type AdminOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface AdminOrder {
  _id: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: AdminOrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  createdAt: string;
}

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    _id: "ORD-001", customerName: "Alice Johnson", customerEmail: "alice@example.com",
    items: [{ name: "Wireless Headphones", quantity: 1, price: 179.99 }, { name: "Smart Watch", quantity: 1, price: 179.99 }],
    total: 359.98, status: "delivered", paymentStatus: "paid", createdAt: "2026-06-20T10:00:00Z",
  },
  {
    _id: "ORD-002", customerName: "Bob Martinez", customerEmail: "bob@example.com",
    items: [{ name: "Running Trainers Pro", quantity: 1, price: 99.99 }],
    total: 99.99, status: "shipped", paymentStatus: "paid", createdAt: "2026-06-22T14:30:00Z",
  },
  {
    _id: "ORD-003", customerName: "Carol White", customerEmail: "carol@example.com",
    items: [{ name: "Yoga Mat Pro", quantity: 2, price: 49.99 }],
    total: 99.98, status: "processing", paymentStatus: "paid", createdAt: "2026-06-24T09:15:00Z",
  },
  {
    _id: "ORD-004", customerName: "David Kim", customerEmail: "david@example.com",
    items: [{ name: "Mechanical Keyboard TKL", quantity: 1, price: 89.99 }],
    total: 89.99, status: "pending", paymentStatus: "pending", createdAt: "2026-06-25T16:45:00Z",
  },
  {
    _id: "ORD-005", customerName: "Emma Davis", customerEmail: "emma@example.com",
    items: [{ name: "Linen Duvet Cover Set", quantity: 1, price: 119.99 }, { name: "Scented Soy Candle Set", quantity: 2, price: 34.99 }],
    total: 189.97, status: "pending", paymentStatus: "pending", createdAt: "2026-06-26T11:00:00Z",
  },
  {
    _id: "ORD-006", customerName: "Frank Lee", customerEmail: "frank@example.com",
    items: [{ name: "Men's Classic Oxford Shirt", quantity: 3, price: 34.99 }],
    total: 104.97, status: "cancelled", paymentStatus: "failed", createdAt: "2026-06-21T08:20:00Z",
  },
  {
    _id: "ORD-007", customerName: "Grace Chen", customerEmail: "grace@example.com",
    items: [{ name: "Portable Bluetooth Speaker", quantity: 1, price: 89.99 }, { name: "Indoor Plant Starter Kit", quantity: 1, price: 39.99 }],
    total: 129.98, status: "delivered", paymentStatus: "paid", createdAt: "2026-06-18T13:00:00Z",
  },
  {
    _id: "ORD-008", customerName: "Henry Brown", customerEmail: "henry@example.com",
    items: [{ name: "4K Webcam with Ring Light", quantity: 1, price: 109.99 }],
    total: 109.99, status: "shipped", paymentStatus: "paid", createdAt: "2026-06-23T17:30:00Z",
  },
  {
    _id: "ORD-009", customerName: "Isla Thompson", customerEmail: "isla@example.com",
    items: [{ name: "Deep Tissue Massage Gun", quantity: 1, price: 99.99 }, { name: "Resistance Band Set", quantity: 1, price: 24.99 }],
    total: 124.98, status: "processing", paymentStatus: "paid", createdAt: "2026-06-25T10:45:00Z",
  },
  {
    _id: "ORD-010", customerName: "James Wilson", customerEmail: "james@example.com",
    items: [{ name: "Atomic Habits", quantity: 2, price: 14.99 }, { name: "Think Again", quantity: 1, price: 13.99 }],
    total: 43.97, status: "delivered", paymentStatus: "paid", createdAt: "2026-06-17T09:00:00Z",
  },
];

// ─── Initial products state (for CRUD) ───────────────────────────────────────

export const INITIAL_PRODUCTS: Product[] = MOCK_PRODUCTS.map((p) => ({ ...p }));
