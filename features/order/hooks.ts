import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Alert, Linking } from 'react-native';
import { createOrder, fetchOrders } from './api';
import { Order } from './types';
import { sortOrdersByDate } from './utils';

export const useFetchOrders = (userId?: string) => {
  return useQuery<Order[]>({
    queryKey: ['orders', userId],
    queryFn: () => fetchOrders(userId!),
    enabled: !!userId,
    select: sortOrdersByDate,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: async (data) => {
      if (!data?.redirect_url) {
        Alert.alert('Payment error');
        return;
      }

      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      await Linking.openURL(data.redirect_url);
    },
    onError: () => {
      Alert.alert('Order failed');
    },
  });
};
