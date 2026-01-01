import { CartItem } from './types';

export const calculateCartTotals = (cart: CartItem[], quantityMap: Record<string, number>) => {
  let sub = 0;
  cart.forEach((item) => {
    const key = `${item.productId}_${item.size}`;
    const qty = quantityMap[key] ?? item.quantity;
    sub += item.price * qty;
  });

  const shipping = Math.ceil(sub * 0.1);
  return {
    subtotal: sub,
    shippingFee: shipping,
    total: sub + shipping,
  };
};
