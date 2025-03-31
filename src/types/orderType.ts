import { T_PRODUCT_RESPONSE } from "./productType";

export type T_ORDER_REQUEST = {
  cartIds: number[];
  delivery: {
    city: string;
    district: string;
    ward: string;
    text: string;
    note: string;
  };
};

export type T_ORDER_RESPONSE = {
  id: number;
  state: string;
  code: string;
  totalBill: number;
  totalQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type T_ONE_ORDER_RESPONSE = {
  id: number;
  code: string;
  createdAt: Date;
  deletedAt: Date | null;
  delivery: {
    city: string;
    district: string;
    ward: string;
    text: string;
    id: number;
    note: string;
    createAt: Date;
    updatedAt: Date;
  };
  items: {
    id: number;
    product: T_PRODUCT_RESPONSE;
  }[];
  state: string;
  totalBill: number;
  totalQuantity: number;
  updatedAt: Date;
};

export type T_ORDER_ADDRESS = {
  city: string;
  district: string;
  ward: string;
  text: string;
  note: string;
};

export type T_ORDER_STATE = {
  state: string;
};