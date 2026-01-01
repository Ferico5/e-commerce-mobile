import axios from '@/lib/axiosInstance';
import { CreateOrderPayload, Order } from './types';

export const createOrder = async (payload: CreateOrderPayload) => {
  const res = await axios.post('/create-order', payload);
  return res.data;
};

export const fetchOrders = async (userId: string): Promise<Order[]> => {
  const { data } = await axios.get(`/orders/${userId}`);
  return data.orders;
};
