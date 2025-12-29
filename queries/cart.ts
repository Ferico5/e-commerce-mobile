import axios from '@/utils/axiosInstance';

export type CartItem = {
  _id: string;
  productId: string;
  image: string[];
  name: string;
  size: string;
  price: number;
  quantity: number;
};

export const fetchCart = async (): Promise<CartItem[]> => {
  const res = await axios.get('/get-cart');
  return res.data.cartItems || [];
};

export const addToCart = async (body: { productId: string; quantity: number; size: string }) => {
  return axios.post('/add-cart', body);
};

export const updateCartQty = async (productId: string, size: string, quantity: number) => {
  return axios.put(`/cart/${productId}`, { size, quantity });
};

export const deleteCartItem = async (productId: string, size: string) => {
  return axios.delete(`/cart/${productId}?size=${size}`);
};
