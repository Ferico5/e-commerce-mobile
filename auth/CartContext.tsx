import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

type CartContextProps = {
  cartCount: number;
  setCartCount: (count: number) => void;
  fetchCartCount: () => Promise<void>;
  resetCart: () => void;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartCount = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('/get-cart', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.cartItems || [];
      const total = items.reduce((sum: number, item: any) => sum + item.quantity, 0);

      setCartCount(total);
    } catch (error) {
      console.log('Error fetching cart: ', error);
    }
  };

  const resetCart = () => setCartCount(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  return <CartContext.Provider value={{ cartCount, setCartCount, fetchCartCount, resetCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider! Contact the Developer!');
  return context;
};
