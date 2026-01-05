import { useSyncCart } from "@/features/cart/hooks";

export function Provider() {
  useSyncCart();
  return null;
}
