import axios from '@/utils/axiosInstance';

export const createOrder = async (payload: { userId: string; items: any[]; paymentMethod: string; street: string; city: string; state: string; zipcode: string; country: string; phone: string }) => {
  const { data } = await axios.post('/create-order', payload);
  return data;
};
