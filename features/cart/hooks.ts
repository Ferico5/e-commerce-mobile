import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Alert } from "react-native";
import { addToCart, deleteCartItem, fetchCart, updateCartQty } from "./api";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      Alert.alert("Success", "Item added to cart!");
    },
  });
};

export const useFetchCart = (enabled: boolean) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    enabled,
  });
};

export const useUpdateCartQty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCartQty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

export const useSyncCart = () => {
  const user = useAuthStore((s) => s.user);
  const setCartCount = useCartStore((s) => s.setCartCount);

  const { data: cart = [] } = useFetchCart(!!user);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  }, [cart, setCartCount]);
};
