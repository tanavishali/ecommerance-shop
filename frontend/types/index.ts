// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = "guest" | "user" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: UserRole;
  isLoading: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  saleEndsAt?: string | null;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  _id: string;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  updatedAt: string;
}

export interface LocalCartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

export interface CartState {
  localItems: LocalCartItem[];
  isOpen: boolean;
}

// ─── Order ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  total: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod?: "card" | "cod";
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  items: { productId: string; quantity: number }[];
  shippingAddress: ShippingAddress;
  paymentToken?: string;
  paymentIntentId?: string;
  paymentMethod?: "card" | "cod";
}

// ─── API Shared ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export interface ProductQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeProducts: number;
  newCustomers: number;
}

export interface OrdersByStatus {
  status: OrderStatus;
  count: number;
}

export interface SalesByDay {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  name: string;
  imageUrl: string;
  totalSold: number;
  revenue: number;
}
