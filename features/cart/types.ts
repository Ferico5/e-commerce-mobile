export interface CartItem {
  _id: string;
  productId: string;
  image: string[];
  name: string;
  size: string;
  price: number;
  quantity: number;
}

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  size: string;
}

export interface UpdateCartQtyPayload {
  productId: string;
  size: string;
  quantity: number;
}

export interface DeleteCartItemPayload {
  productId: string;
  size: string;
}
