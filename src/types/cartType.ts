import { T_PRODUCT_RESPONSE } from "./productType";

export type T_CART_REQUEST_CREATE = {
  productId: number;
};

export type T_CART_REQUEST_UPDATE = {
  quantity: number;
};

export type T_CART_RESPONSE = {
  id: number;
  product: T_PRODUCT_RESPONSE;
  quantity: number;
};
