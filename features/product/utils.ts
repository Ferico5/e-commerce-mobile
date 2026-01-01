import { Product } from './types';

export const getLastCollectionList = (products: Product[], limit = 10): Product[] => {
  return [...products].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
};

export const getBestSellerList = (products: Product[], limit = 5): Product[] => {
  return products
    .filter((item) => item.bestSeller)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};
