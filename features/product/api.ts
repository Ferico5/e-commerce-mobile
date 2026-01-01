import axios from '@/lib/axiosInstance';
import { Product } from './types';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get('/list');
  return res.data.listProduct || [];
};

export const fetchProductDetail = async (id: string): Promise<Product> => {
  const res = await axios.get(`/single/${id}`);
  return res.data.singleProduct;
};

export const fetchRelatedProducts = async (category: string, excludeId: string): Promise<Product[]> => {
  const res = await axios.get(`/products?category=${category}`);
  return res.data.products.filter((p: Product) => p._id !== excludeId).slice(0, 5);
};
