import { GENERIC_PATH } from "@/constants";
import { T_ORDER_ADDRESS, T_ORDER_REQUEST, T_ORDER_STATE, T_PAGINATION } from "@/types";
import { mainApi } from "@/utils";

export const orderClientServices = {
  getAll: (params?: T_PAGINATION) => mainApi.get(GENERIC_PATH.ORDER, {
     params: {
        page: params?.page,
        pageSize: params?.pageSize,
      },
  }),
  create: (data: T_ORDER_REQUEST) => mainApi.post(GENERIC_PATH.ORDER, data),
  editOne: (id: number, data: T_ORDER_ADDRESS) =>mainApi.put(`${GENERIC_PATH.ORDER}/${id}`, data),
  getOne: (id: number) => mainApi.get(`${GENERIC_PATH.ORDER}/${id}`),
  updateState: (id:number, data: T_ORDER_STATE) => mainApi.put(`${GENERIC_PATH.ORDER}/${id}/action`, data)
};

export const orderAdminServices = {
  getAll: (params?: T_PAGINATION) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}`, {
      params: {
        page: params?.page,
        pageSize: params?.pageSize,
      },
    }),
  editOne: (id: number, data: T_ORDER_ADDRESS) =>
    mainApi.put(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}/${id}`, data),
  getOne: (id: number) =>
    mainApi.get(`${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}/${id}`),
  updateState: (id: number, data: T_ORDER_STATE) =>
    mainApi.put(
      `${GENERIC_PATH.MANAGEMENT}${GENERIC_PATH.ORDER}/${id}/action`,
      data
    ),
};
