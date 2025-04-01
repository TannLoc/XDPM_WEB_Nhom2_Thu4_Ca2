import { T_PRODUCT_RESPONSE } from "./productType";

export type T_SHIPMENT_REQUEST = {
    quantity: number;
    productId: number;
    importDate: Date;
}

export type T_SHIPMENT_RESPONSE = {
    id: number;
    quantity: number;
    product: T_PRODUCT_RESPONSE;
    importDate: Date;
    createAt: Date;
    updateAt: Date;
}