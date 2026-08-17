export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  shortDescription: string;
  description: string;
  stock: number;
  inStock: boolean;
  isFlashSale?: boolean;
  flashSaleSoldPercent?: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  freeShipping?: boolean;
  tags: string[];
  colors?: ProductColor[];
  storageOptions?: string[];
  specs: ProductSpec[];
  features: string[];
  warranty: string;
  reviews?: Review[];
}

export interface CartItem {
  cartId: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  unitPrice: number;
}

export interface FilterState {
  searchQuery: string;
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  freeShippingOnly: boolean;
  discountThreshold: number | null;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating' | 'discount';
}

export type ViewMode = 'grid' | 'list';

export type PageRoute = 'home' | 'shop' | 'deals' | 'new-arrivals' | 'compare' | 'cart' | 'checkout' | 'orders' | 'product-detail';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
  bannerImage: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
