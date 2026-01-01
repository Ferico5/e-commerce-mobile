import axios from '@/lib/axiosInstance';
import { AddToCartPayload, CartItem, DeleteCartItemPayload, UpdateCartQtyPayload } from './types';

export const fetchCart = async (): Promise<CartItem[]> => {
  const res = await axios.get('/get-cart');
  return res.data.cartItems || [];
};

export const addToCart = (payload: AddToCartPayload) => {
  return axios.post('/add-cart', payload);
};

export const updateCartQty = ({ productId, size, quantity }: UpdateCartQtyPayload) => {
  return axios.put(`/cart/${productId}`, { size, quantity });
};

export const deleteCartItem = ({ productId, size }: DeleteCartItemPayload) => {
  return axios.delete(`/cart/${productId}?size=${size}`);
};
