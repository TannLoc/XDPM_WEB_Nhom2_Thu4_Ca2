import { GENERIC_PATH } from "@/constants";
import { T_PAGINATION } from "@/types";
import { mainApi } from "@/utils";

export const customerServices = {
  getOne: (params?: T_PAGINATION) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.CUSTOMER}`, {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
      },
    }),
};