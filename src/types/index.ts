export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'delivered';
  createdAt: Date;
  paymentMethod: 'pix';
}

export interface Category {
  id: string;
  name: string;
}

export interface ShopInfo {
  siteName: string;
  logoUrl: string;
  phone: string;
  instagram: string;
}