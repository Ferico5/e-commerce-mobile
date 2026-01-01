import { CartItem } from '@/features/cart/types';

export type PaymentMethod = 'bca' | 'bri' | 'mandiri' | 'bni' | 'permata';

export type OrderStatus = 'Order Placed' | 'Packing' | 'Out for Delivery' | 'Delivered';

export interface Order {
  _id: string;
  items: CartItem[];
  total_fee: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  date: string;
}

export interface CreateOrderPayload {
  userId: string;
  items: CartItem[];
  paymentMethod: PaymentMethod;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}
