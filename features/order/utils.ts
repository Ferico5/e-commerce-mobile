import { Order } from './types';

export const sortOrdersByDate = (orders: Order[]): Order[] => {
  return [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
