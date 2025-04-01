import { GENERIC_PATH } from "@/constants";
import { T_BRAND_REQUEST, T_PAGINATION } from "@/types";
import { mainApi } from "@/utils";

export const brandClientServices = {
  getAll: () =>
    mainApi.get(GENERIC_PATH.BRAND, {
      params: {
        pageSize: 100,
      },
    }),
  getOne: (id: number) => mainApi.get(`${GENERIC_PATH.BRAND}/${id}`),
};

export const brandAdminServices = {
  getAll: (params?: T_PAGINATION) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}`, {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
      },
    }),
  getOne: (id: number) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}/${id}`),
  create: (data: T_BRAND_REQUEST) =>
    mainApi.post(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}`, data),
  edit: (id: number, data: T_BRAND_REQUEST) =>
    mainApi.put(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}/${id}`, data),
  delete: (id: number) =>
    mainApi.delete(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.BRAND}/${id}`),
};