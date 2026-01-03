import { useFetchCart } from "@/features/cart/hooks";
import { useAuthStore } from "@/stores/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

type CartContextProps = {
  cartCount: number;
  resetCart: () => void;
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const { data: cart = [] } = useFetchCart(!!user);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const resetCart = () => {
    queryClient.setQueryData(["cart"], []);
  };

  return (
    <CartContext.Provider value={{ cartCount, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "useCart must be used inside CartProvider! Contact the Developer!"
    );
  return context;
};
