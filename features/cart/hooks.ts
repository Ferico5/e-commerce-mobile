import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { addToCart, deleteCartItem, fetchCart, updateCartQty } from './api';

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      Alert.alert('Success', 'Item added to cart!');
    },
  });
};

export const useFetchCart = (enabled: boolean) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled,
  });
};

export const useUpdateCartQty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartQty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
