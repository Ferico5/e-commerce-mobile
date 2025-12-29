import { fetchCart } from '@/queries/cart';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

type CartContextProps = {
  cartCount: number;
  resetCart: () => void;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, authReady } = useAuth();
  const queryClient = useQueryClient();

  const { data: cart = [] } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: authReady && !!user,
  });

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const resetCart = () => {
    queryClient.setQueryData(['cart'], []);
  };

  return <CartContext.Provider value={{ cartCount, resetCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider! Contact the Developer!');
  return context;
};
