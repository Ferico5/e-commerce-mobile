import axios from '@/utils/axiosInstance';

export type OrderProps = {
  _id: string;
  items: {
    _id: string;
    name: string;
    image: string[];
    quantity: number;
    size?: string;
    price: number;
  }[];
  total_fee: number;
  paymentMethod: string;
  status: string;
  date: string;
};

export const createOrder = async (payload: { userId: string; items: any[]; paymentMethod: string; street: string; city: string; state: string; zipcode: string; country: string; phone: string }) => {
  const { data } = await axios.post('/create-order', payload);
  return data;
};

export const fetchOrders = async (userId: string): Promise<OrderProps[]> => {
  const { data } = await axios.get(`/orders/${userId}`);
  return data.orders;
};
