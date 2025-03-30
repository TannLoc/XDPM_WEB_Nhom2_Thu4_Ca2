import { GENERIC_PATH } from "@/constants";
import { T_CART_REQUEST_CREATE } from "@/types/cartType";
import { mainApi } from "@/utils";

export const cartServices = {
  getAll: () => mainApi.get(GENERIC_PATH.CART),
  addProductToCartById: (data: T_CART_REQUEST_CREATE) =>
    mainApi.post(GENERIC_PATH.CART, data),
  deleteOne: (id:number)=> mainApi.delete(`${GENERIC_PATH.CART}/${id}`)
};
