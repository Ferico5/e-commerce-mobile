import { useQuery } from '@tanstack/react-query';
import { fetchProductDetail, fetchProducts, fetchRelatedProducts } from './api';

export const useProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

export const useProductDetail = (id: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

export const useRelatedProducts = (category?: string, productId?: string) =>
  useQuery({
    queryKey: ['related-products', category, productId],
    queryFn: () => fetchRelatedProducts(category!, productId!),
    enabled: !!category && !!productId,
  });
