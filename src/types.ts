export type ProductCategory = 'all' | 'pitha' | 'ingredients' | 'sweets' | 'grocery';

export interface ProductOption {
  label: string;
  price: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  unit: string;
  rating: number;
  reviewCount: number;
  tag?: string;
  badgeColor?: string;
  isAvailable: boolean;
  isComingSoon?: boolean;
  description: string;
  details: string[];
  ingredients: string[];
  image: string;
  options?: ProductOption[];
}

export interface CartItem {
  product: Product;
  selectedOption?: ProductOption;
  quantity: number;
}

export type DeliveryZone = 'inside_dhaka' | 'outside_dhaka';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad';

export type OrderStatus = 'pending' | 'preparing' | 'on_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  zone: DeliveryZone;
  deliveryCharge: number;
  paymentMethod: PaymentMethod;
  notes?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface PixelEventLog {
  id: string;
  eventName: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface FacebookPixelConfig {
  pixelId: string;
  isEnabled: boolean;
  testMode: boolean;
}
