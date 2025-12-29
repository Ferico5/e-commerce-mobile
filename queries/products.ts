import axios from '@/utils/axiosInstance';

export interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestSeller: boolean;
  date: string;
}

export const fetchProducts = async (): Promise<ProductProps[]> => {
  const res = await axios.get('/list');
  return res.data.listProduct || [];
};

export const fetchProductDetail = async (id: string): Promise<ProductProps> => {
  const res = await axios.get(`/single/${id}`);
  return res.data.singleProduct;
};

export const fetchRelatedProducts = async (category: string, excludeId: string): Promise<ProductProps[]> => {
  const res = await axios.get(`/products?category=${category}`);
  return res.data.products.filter((p: ProductProps) => p._id !== excludeId).slice(0, 5);
};
